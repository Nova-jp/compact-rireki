import { CVData, PersonalInfo } from '@/types/resume';

interface CVPreviewContentProps {
  data: CVData;
  personalInfo: PersonalInfo;
}

export function CVPreviewContent({ data, personalInfo }: CVPreviewContentProps) {
  const solidBorder = "1px solid black";
  const grayBgColor = "#f3f4f6";

  const styles = `
    .cv-container-inner {
      font-family: 'Noto Serif JP', "MS Mincho", "Hiragino Mincho ProN", serif;
      line-height: 1.5;
      color: #0f172a;
      overflow-wrap: break-word;
    }
    .cv-table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      margin-bottom: 1rem;
      font-size: 9pt;
      border: ${solidBorder};
    }
    .cv-table th, .cv-table td {
      border: ${solidBorder};
      padding: 8px;
      vertical-align: top;
      word-break: break-all;
    }
    .section-title {
      font-size: 1rem;
      font-weight: bold;
      border-bottom: 2px solid black;
      margin-bottom: 0.5rem;
      padding-bottom: 2px;
      margin-top: 1.5rem;
    }
    .cv-header {
      text-align: right;
      margin-bottom: 2rem;
    }
    .cv-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 2rem;
      letter-spacing: 0.5em;
    }
    @media print {
      .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        font-size: 10px;
        color: #666;
      }
      .page-footer::after {
        content: "- " counter(page) " -";
      }
    }
  `;

  return (
    <div 
      className="cv-container-inner"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        padding: '15mm', 
        boxSizing: 'border-box', 
        background: 'white',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      <div className="hidden print:block page-footer" />

      <h1 className="cv-title">職務経歴書</h1>
      
      <div className="cv-header">
        <p style={{ fontSize: '0.875rem' }}>{data.submissionDate || '　　年　月　日'} 現在</p>
        <p style={{ fontSize: '1.125rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{personalInfo.name || '氏名 未入力'}</p>
      </div>
      
      {/* 職務要約 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">【職務要約】</h2>
        <p style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap', paddingLeft: '0.5rem' }}>
          {data.summary || '職務要約が入力されていません。'}
        </p>
      </section>

      {/* 職務経歴 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">【職務経歴】</h2>
        
        {(!data.workHistory || data.workHistory.length === 0) && (
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', paddingLeft: '0.5rem' }}>職務経歴が入力されていません</p>
        )}
        
        {data.workHistory && data.workHistory.map((entry, index) => (
          <div key={entry.id} style={{ marginBottom: '2rem', marginTop: index > 0 ? '2.5rem' : '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', borderBottom: '1px solid black', paddingBottom: '2px' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '1rem' }}>■{entry.company}（{entry.periodStart} 〜 {entry.periodEnd}）</h3>
            </div>
            
            <div style={{ fontSize: '9pt', marginBottom: '0.75rem', marginLeft: '0.5rem', color: '#334155' }}>
              {entry.businessContent && (
                <div style={{ marginBottom: '2px' }}>
                  <span style={{ fontWeight: 'bold' }}>事業内容：</span>
                  <span>{entry.businessContent}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2px', flexWrap: 'wrap' }}>
                  {entry.capital && <span><span style={{ fontWeight: 'bold' }}>資本金：</span>{entry.capital}</span>}
                  {entry.revenue && <span><span style={{ fontWeight: 'bold' }}>売上高：</span>{entry.revenue}</span>}
                  {entry.employees && <span><span style={{ fontWeight: 'bold' }}>従業員数：</span>{entry.employees}</span>}
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {entry.employmentType && <span><span style={{ fontWeight: 'bold' }}>雇用形態：</span>{entry.employmentType}</span>}
                  {entry.position && <span><span style={{ fontWeight: 'bold' }}>役職：</span>{entry.position}</span>}
              </div>
            </div>

            <table className="cv-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>期間</th>
                  <th style={{ width: '50%' }}>業務内容・プロジェクト概要</th>
                  <th style={{ width: '35%' }}>役割・実績・環境</th>
                </tr>
              </thead>
              <tbody>
                {entry.projects && entry.projects.length > 0 ? (
                  entry.projects.map((project) => (
                    <tr key={project.id}>
                      <td style={{ textAlign: 'center', whiteSpace: 'pre-wrap' }}>
                        {project.period}
                      </td>
                      <td>
                        <p style={{ fontWeight: 'bold', marginBottom: '0.25rem', textDecoration: 'underline' }}>{project.name}</p>
                        <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5', marginBottom: '0.5rem' }}>{project.content}</p>
                        {project.teamSize && <p style={{ fontSize: '0.75rem', color: '#475569' }}>【規模】{project.teamSize}</p>}
                      </td>
                      <td>
                        {project.role && <p style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: 'bold' }}>【役割】</span>{project.role}</p>}
                        {project.environment && (
                           <div style={{ marginBottom: '0.5rem' }}>
                             <p style={{ fontWeight: 'bold' }}>【環境】</p>
                             <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem' }}>{project.environment}</p>
                           </div>
                        )}
                        {project.performance && (
                           <div>
                             <p style={{ fontWeight: 'bold' }}>【実績】</p>
                             <p style={{ whiteSpace: 'pre-wrap' }}>{project.performance}</p>
                           </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: '#94a3b8' }}>プロジェクト詳細が入力されていません</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </section>

      {/* 資格・免許 */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">【保有資格・免許】</h2>
        {data.licenses && data.licenses.length > 0 ? (
             <div style={{ paddingLeft: '0.5rem' }}>
                 {data.licenses.map((license) => (
                     <div key={license.id} style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', marginBottom: '2px' }}>
                         <span style={{ width: '6rem' }}>{license.date}</span>
                         <span>{license.name}</span>
                     </div>
                 ))}
             </div>
        ) : (
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', paddingLeft: '0.5rem' }}>資格情報が入力されていません。</p>
        )}
      </section>

      {/* スキル */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">【活かせる経験・知識・技術】</h2>
        <div style={{ fontSize: '0.875rem', lineHeight: '1.5', whiteSpace: 'pre-wrap', padding: '1rem', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '4px' }}>
          {data.skills || 'スキル情報が入力されていません。'}
        </div>
      </section>

      {/* 自己PR */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">【自己PR】</h2>
        <div style={{ fontSize: '0.875rem', lineHeight: '1.5', whiteSpace: 'pre-wrap', paddingLeft: '0.5rem' }}>
          {data.selfPromotion || '自己PRが入力されていません。'}
        </div>
      </section>
      
      <div style={{ textAlign: 'right', fontSize: '0.875rem', marginTop: 'auto' }}>以上</div>
    </div>
  );
}