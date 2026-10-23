import Image from 'next/image'
import { SCRIPT } from './ui'

type Cmp = { title: readonly string[]; head: string; img: string; rows: readonly (readonly [string, boolean])[] }

const Check = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F8D41B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="yes"><path d="M4 12.5l5 5L20 6" /></svg>
)
const Cross = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EE6F5B" strokeWidth="2.5" strokeLinecap="round" aria-label="no"><path d="M5 5l14 14M19 5L5 19" /></svg>
)

/** "revolutionizing the modern toothbrush" comparison table vs. many popular brands. */
export default function Comparison({ cmp, logo }: { cmp: Cmp; logo: string }) {
  return (
    <section className="bg-[#394C97] text-white py-8">
      <h2 className="text-center px-4 text-[24px] md:text-[30px] leading-9 font-bold text-[#0BAAC0]">
        {cmp.title[0]}<span className="font-normal text-[#F8D41B] text-[30px] md:text-[36px]" style={SCRIPT}>{cmp.title[1]}</span>{cmp.title[2]}
      </h2>
      <div className="max-w-[1280px] mx-auto px-4 mt-6 flex gap-6 lg:gap-16 items-center">
        <div className="hidden md:block shrink-0 w-[160px] lg:w-[200px]">
          <Image src={cmp.img} alt="" width={256} height={500} className="w-full h-auto" />
        </div>
        <table className="w-full border-collapse text-[13px] md:text-[16px] leading-6">
          <thead>
            <tr className="border-b border-white/80">
              <th className="text-left font-bold py-4 pr-2">{cmp.head}</th>
              <th className="w-[90px] md:w-[200px] border-l border-white/80 font-bold py-3 px-2 text-center">many<br />popular<br />brands</th>
              <th className="w-[110px] md:w-[200px] border-x-2 border-t-2 border-[#F8D41B] py-3 px-2">
                <Image src={logo} alt="SuperMouth" width={170} height={51} className="mx-auto w-full max-w-[170px] h-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {cmp.rows.map(([label, others], i) => (
              <tr key={label} className="border-b border-white/80">
                <td className="py-4 pr-2">{label}</td>
                <td className="border-l border-white/80 text-center"><span className="inline-flex">{others ? <Check /> : <Cross />}</span></td>
                <td className={`border-x-2 border-[#F8D41B] text-center ${i === cmp.rows.length - 1 ? 'border-b-2' : ''}`}><span className="inline-flex"><Check /></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-10 text-center px-4 text-[18px] md:text-[22px] font-bold">Not Conventional, Not Just Natural - Welcome to SuperMouth!</p>
    </section>
  )
}
