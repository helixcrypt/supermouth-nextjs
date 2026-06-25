const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

const endpoint = `https://${domain}/api/2024-04/graphql.json`

async function shopifyFetch<T>({ query, variables }: { query: string; variables?: object }): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`)
  }

  const json = await response.json()
  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

// ── Products ──────────────────────────────────────────────

export async function getAllProducts(first = 50) {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges { node { url altText } }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                }
              }
            }
            tags
            productType
          }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({ query, variables: { first } })
  return data.products.edges.map((e: any) => e.node)
}

export async function getProductByHandle(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        images(first: 10) {
          edges { node { url altText } }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              availableForSale
              selectedOptions { name value }
            }
          }
        }
        tags
        productType
        vendor
      }
    }
  `
  const data = await shopifyFetch<any>({ query, variables: { handle } })
  return data.product
}

// ── Collections ───────────────────────────────────────────

export async function getCollectionByHandle(handle: string, first = 50) {
  const query = `
    query GetCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        description
        image { url altText }
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice { amount currencyCode }
              }
              images(first: 1) {
                edges { node { url altText } }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                    price { amount currencyCode }
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({ query, variables: { handle, first } })
  return data.collection
}

export async function getAllCollections() {
  const query = `
    query GetCollections {
      collections(first: 30) {
        edges {
          node {
            id
            title
            handle
            description
            image { url altText }
          }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({ query })
  return data.collections.edges.map((e: any) => e.node)
}

// ── Cart ──────────────────────────────────────────────────

export async function createCart() {
  const query = `
    mutation CartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle images(first:1){ edges{ node{ url } } } }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({ query })
  return data.cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle images(first:1){ edges{ node{ url } } } }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({
    query,
    variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  })
  return data.cartLinesAdd.cart
}

export async function getCart(cartId: string) {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product { title handle images(first:1){ edges{ node{ url } } } }
                }
              }
            }
          }
        }
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({ query, variables: { cartId } })
  return data.cart
}

export async function removeFromCart(cartId: string, lineId: string) {
  const query = `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price { amount currencyCode }
                    product { title handle images(first:1){ edges{ node{ url } } } }
                  }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  `
  const data = await shopifyFetch<any>({ query, variables: { cartId, lineIds: [lineId] } })
  return data.cartLinesRemove.cart
}
