import { ResumeData } from '@/types/resume';

interface ResumePreviewContentProps {
  data: ResumeData;
}

export function ResumePreviewContent({ data }: ResumePreviewContentProps) {
  const info = data.personalInfo;

  // Configuration for filler rows
  const MAX_ROWS_P1 = 18;
  const MAX_ROWS_P2_WORK = 8;
  const MAX_ROWS_LICENSES = 7;

  // Placeholder arrays for empty rows
  const fillerP1 = Array(Math.max(0, MAX_ROWS_P1 - (data.education?.length || 0) - (data.experience?.length || 0) - 2)).fill(0);
  const fillerP2Work = Array(MAX_ROWS_P2_WORK).fill(0);
  const fillerLicenses = Array(Math.max(0, MAX_ROWS_LICENSES - (data.licenses?.length || 0))).fill(0);

  // Style constants
  const solidBorder = "1px solid black";
  const thinBorder = "0.5px dotted #666";

  return (
    <div className="flex flex-col gap-8 pb-20 print:gap-0 print:pb-0" style={{ fontFamily: "'Noto Serif JP', \"MS Mincho\", \"Hiragino Mincho ProN\", serif" }}>
      {/* PAGE 1 */}
      <div className="resume-page bg-white shadow-2xl overflow-hidden flex flex-col relative print:shadow-none print:m-0" style={{ width: '210mm', height: '297mm', padding: '15mm', boxSizing: 'border-box', pageBreakAfter: 'always' }}>
        
        {/* Floating Photo */}
        <div 
          className="absolute right-[14mm] top-[16mm] overflow-hidden flex items-center justify-center text-center text-[7pt] text-slate-400"
          style={{ width: '30mm', height: '40mm', zIndex: 10 }}
        >
          {info.photo ? (
            <img src={info.photo} alt="Photo" className="w-full h-full object-cover shadow-sm" />
          ) : (
            <div className="border border-dashed border-slate-200 w-full h-full flex items-center justify-center bg-gray-50/50">
              写真貼付位置<br/>(40mm×30mm)
            </div>
          )}
        </div>

        <div className="flex justify-between items-end mb-4 pr-[35mm]">
          <h1 className="text-2xl font-bold tracking-[1em] ml-[1em]">履歴書</h1>
          <p className="text-[10pt]">{data.submissionDate} 現在</p>
        </div>

        {/* Section 1: Name & Birth (Left Side with Notch) */}
        <div className="grid grid-cols-[1fr_30mm] gap-0">
          <div className="flex flex-col border-l border-t border-black" style={{ borderRight: solidBorder }}>
            {/* Name Row */}
            <div className="h-[18px] text-[8pt] px-2 flex items-center bg-gray-50/30" style={{ borderBottom: thinBorder }}>
              ふりがな <span className="ml-4">{info.kana}</span>
            </div>
            <div className="h-[55px] px-4 flex items-center" style={{ borderBottom: solidBorder }}>
              氏　名 <span className="ml-10 font-bold text-2xl">{info.name}</span>
            </div>
            {/* Birthday Row */}
            <div className="h-[35px] px-2 flex items-center">
              {info.birthday}生（満 {info.age || ' '} 歳） <span className="ml-16">性別 {info.gender}</span>
            </div>
          </div>
          <div className="h-[108px]"></div> {/* Notch placeholder */}
        </div>

        {/* Section 2: Primary Address & Phone Box */}
        <div className="grid grid-cols-[1fr_45mm] gap-0 border-l border-r border-t border-black" style={{ borderBottom: solidBorder }}>
          <div className="flex flex-col" style={{ borderRight: solidBorder }}>
            <div className="h-[18px] text-[8pt] px-2 flex items-center bg-gray-50/30" style={{ borderBottom: thinBorder }}>
              ふりがな <span className="ml-4">{info.addressKana}</span>
            </div>
            <div className="h-[60px] px-2 py-1 flex flex-col justify-center leading-snug">
              <p className="text-[10pt]">〒 {info.postalCode}</p>
              <p className="text-[10pt]">{info.address}</p>
            </div>
          </div>
          {/* Phone Box */}
          <div className="flex flex-col justify-center px-2 py-1 space-y-2">
            <div className="flex items-center text-[7.5pt]">
              <span className="w-14 text-gray-500 font-bold">電話番号</span>
              <span className="flex-1 text-right">{info.phone}</span>
            </div>
            <div className="flex items-center text-[7.5pt]">
              <span className="w-14 text-gray-500 font-bold">携帯番号</span>
              <span className="flex-1 text-right">{info.mobile}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Alt Contact & Email Box */}
        <div className="grid grid-cols-[1fr_45mm] gap-0 border-l border-r border-b border-black mb-4">
          <div className="flex flex-col relative" style={{ borderRight: solidBorder }}>
            <div className="h-[18px] text-[8pt] px-2 flex items-center bg-gray-50/30" style={{ borderBottom: thinBorder }}>
              ふりがな <span className="ml-4">{info.altAddressKana}</span>
            </div>
            <div className="h-[60px] px-2 py-1 flex flex-col justify-center leading-snug relative">
              <span className="absolute top-1 right-2 text-[5.5pt] text-gray-400 font-bold tracking-tighter">
                連絡先（現住所以外に連絡を希望する場合のみ記入）
              </span>
              <p className="text-[10pt]">{info.altPostalCode && `〒 ${info.altPostalCode}`}</p>
              <p className="text-[10pt]">{info.altAddress}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center px-2 py-1">
             <div className="flex flex-col text-[7.5pt]">
               <span className="text-gray-500 font-bold mb-1">Email</span>
               <div className="break-all leading-tight">{info.email}</div>
             </div>
          </div>
        </div>

        {/* Education & Experience Table */}
        <table className="w-full border-collapse text-[10pt] mb-2" style={{ border: solidBorder, tableLayout: 'fixed' }}>
          <thead>
            <tr className="h-7 bg-gray-50/50">
              <th style={{ borderRight: solidBorder, borderBottom: solidBorder, width: '15%' }} className="font-normal">年</th>
              <th style={{ borderRight: solidBorder, borderBottom: solidBorder, width: '8%' }} className="font-normal">月</th>
              <th style={{ borderBottom: solidBorder }} className="font-normal text-center">学歴・職歴</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-7"><td style={{ borderRight: solidBorder, borderBottom: solidBorder }}></td><td style={{ borderRight: solidBorder, borderBottom: solidBorder }}></td><td style={{ borderBottom: solidBorder }} className="text-center text-[9pt]">学　　歴</td></tr>
            {data.education?.map((item, i) => (
              <tr key={i} className="h-7">
                <td style={{ borderRight: solidBorder, borderBottom: solidBorder }} className="text-center">{item.year}</td>
                <td style={{ borderRight: solidBorder, borderBottom: solidBorder }} className="text-center">{item.month}</td>
                <td style={{ borderBottom: solidBorder, wordBreak: 'break-all' }} className="px-2">{item.content}</td>
              </tr>
            ))}
            <tr className="h-7">
              <td style={{ borderRight: solidBorder, borderBottom: solidBorder }}></td>
              <td style={{ borderRight: solidBorder, borderBottom: solidBorder }}></td><td style={{ borderBottom: solidBorder }} className="text-center text-[9pt]">職　　歴</td></tr>
            {data.experience?.map((item, i) => (
              <tr key={i} className="h-7">
                <td style={{ borderRight: solidBorder, borderBottom: solidBorder }} className="text-center">{item.year}</td>
                <td style={{ borderRight: solidBorder, borderBottom: solidBorder }} className="text-center">{item.month}</td>
                <td style={{ borderBottom: solidBorder, wordBreak: 'break-all' }} className="px-2">{item.content}</td>
              </tr>
            ))}
            {fillerP1.map((_, i) => (
              <tr key={i} className="h-7">
                <td style={{ borderRight: solidBorder, borderBottom: i === fillerP1.length - 1 ? 'none' : solidBorder }}></td>
                <td style={{ borderRight: solidBorder, borderBottom: i === fillerP1.length - 1 ? 'none' : solidBorder }}></td>
                <td style={{ borderBottom: i === fillerP1.length - 1 ? 'none' : solidBorder }}></td>
              </tr>
            ))}
            <tr className="h-7">
              <td style={{ borderRight: solidBorder }}></td>
              <td style={{ borderRight: solidBorder }}></td>
              <td className="text-right pr-4">以上</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center text-[9pt] mt-auto">1 / 2</div>
      </div>

      {/* PAGE 2 */}
      <div className="resume-page bg-white shadow-2xl overflow-hidden flex flex-col" style={{ width: '210mm', height: '297mm', padding: '15mm', boxSizing: 'border-box', pageBreakAfter: 'always' }}>
        <table className="w-full border-collapse text-[10pt] mb-2" style={{ border: solidBorder, tableLayout: 'fixed' }}>
          <thead>
            <tr className="h-7 bg-gray-50/50">
              <th style={{ borderRight: solidBorder, borderBottom: solidBorder, width: '15%' }} className="font-normal">年</th>
              <th style={{ borderRight: solidBorder, borderBottom: solidBorder, width: '8%' }} className="font-normal">月</th>
              <th style={{ borderBottom: solidBorder }} className="font-normal text-center">学歴・職歴（続き）</th>
            </tr>
          </thead>
          <tbody>
            {fillerP2Work.map((_, i) => (
              <tr key={i} className="h-7">
                <td style={{ borderRight: solidBorder, borderBottom: i === fillerP2Work.length - 1 ? 'none' : solidBorder }}></td>
                <td style={{ borderRight: solidBorder, borderBottom: i === fillerP2Work.length - 1 ? 'none' : solidBorder }}></td>
                <td style={{ borderBottom: i === fillerP2Work.length - 1 ? 'none' : solidBorder }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="w-full border-collapse text-[10pt] mb-2" style={{ border: solidBorder, tableLayout: 'fixed' }}>
          <thead>
            <tr className="h-7 bg-gray-50/50">
              <th style={{ borderRight: solidBorder, borderBottom: solidBorder, width: '15%' }} className="font-normal">年</th>
              <th style={{ borderRight: solidBorder, borderBottom: solidBorder, width: '8%' }} className="font-normal">月</th>
              <th style={{ borderBottom: solidBorder }} className="font-normal text-center">免許・資格</th>
            </tr>
          </thead>
          <tbody>
            {data.licenses?.map((item, i) => (
              <tr key={i} className="h-7">
                <td style={{ borderRight: solidBorder, borderBottom: solidBorder }} className="text-center">{item.year}</td>
                <td style={{ borderRight: solidBorder, borderBottom: solidBorder }} className="text-center">{item.month}</td>
                <td style={{ borderBottom: solidBorder, wordBreak: 'break-all' }} className="px-2">{item.content}</td>
              </tr>
            ))}
            {fillerLicenses.map((_, i) => (
              <tr key={i} className="h-7">
                <td style={{ borderRight: solidBorder, borderBottom: i === fillerLicenses.length - 1 && data.licenses?.length === 0 ? 'none' : solidBorder }}></td>
                <td style={{ borderRight: solidBorder, borderBottom: i === fillerLicenses.length - 1 && data.licenses?.length === 0 ? 'none' : solidBorder }}></td>
                <td style={{ borderBottom: i === fillerLicenses.length - 1 && data.licenses?.length === 0 ? 'none' : solidBorder }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="w-full border-collapse text-[10pt] mb-2" style={{ border: solidBorder, tableLayout: 'fixed' }}>
          <tbody>
            <tr className="h-7 bg-gray-50/50">
              <td style={{ borderBottom: solidBorder }} className="font-bold text-center text-[9pt]">志望の動機、特技、好きな学科、アピールポイントなど</td>
            </tr>
            <tr>
              <td className="h-[140px] align-top p-2 leading-relaxed text-[10pt]" style={{ wordBreak: 'break-all' }}>
                {data.motivation}<br/><br/>
                {data.selfPromotion}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse text-[10pt] mb-2" style={{ border: solidBorder, tableLayout: 'fixed' }}>
          <tbody>
            <tr className="h-10">
              <td style={{ borderRight: solidBorder, width: '50%', wordBreak: 'break-all' }} className="p-1">
                通勤時間<br/>約 {data.commuteTime || ' '}
              </td>
              <td style={{ borderRight: solidBorder, width: '20%' }} className="text-[9pt] p-1">
                扶養家族数<br/>(配偶者を除く)<br/>{data.dependents || '0'}人
              </td>
              <td style={{ borderRight: solidBorder, width: '15%' }} className="text-[9pt] p-1">
                配偶者<br/>{data.spouse || '無'}
              </td>
              <td style={{ width: '15%' }} className="text-[9pt] p-1">
                配偶者の扶養義務<br/>{data.spouseSupport || '無'}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse text-[10pt] mb-2" style={{ border: solidBorder, tableLayout: 'fixed' }}>
          <tbody>
            <tr className="h-7 bg-gray-50/50">
              <td style={{ borderBottom: solidBorder }} className="font-bold text-center text-[9pt]">本人希望記入欄（特に給料・職種・勤務時間・勤務地その他に対して希望があれば記入）</td>
            </tr>
            <tr>
              <td className="h-[80px] align-top p-2 text-[10pt]" style={{ wordBreak: 'break-all' }}>
                {data.requests}
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="text-center text-[9pt] mt-auto">2 / 2</div>
      </div>
    </div>
  );
}
