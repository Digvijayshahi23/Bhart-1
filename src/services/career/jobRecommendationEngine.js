export const JOBS = [
  {
    id: "job_1",
    title: "संघ लोक सेवा आयोग - सिविल सेवा परीक्षा (UPSC CSE 2026)",
    org: "UPSC (Union Public Service Commission)",
    location: "अखिल भारतीय (All India)",
    qualification: "किसी भी विषय में स्नातक (Any Graduate)",
    ageLimit: "21 - 32 वर्ष",
    deadline: "15 मार्च, 2026",
    salary: "₹56,100 - ₹2,50,000 (Level 10)",
    link: "https://upsc.gov.in",
  },
  {
    id: "job_2",
    title: "कर्मचारी चयन आयोग - संयुक्त स्नातक स्तरीय (SSC CGL 2026)",
    org: "SSC (Staff Selection Commission)",
    location: "अखिल भारतीय (All India)",
    qualification: "स्नातक डिग्री (Bachelor's Degree)",
    ageLimit: "18 - 30 वर्ष",
    deadline: "25 अप्रैल, 2026",
    salary: "₹35,400 - ₹1,12,400",
    link: "https://ssc.gov.in",
  },
  {
    id: "job_3",
    title: "बैंकिंग कार्मिक चयन संस्थान - प्रोबेशनरी ऑफिसर (IBPS PO)",
    org: "IBPS (Institute of Banking Personnel Selection)",
    location: "राष्ट्रीयकृत बैंक (All India)",
    qualification: "स्नातक डिग्री",
    ageLimit: "20 - 30 वर्ष",
    deadline: "10 अगस्त, 2026",
    salary: "₹36,000 - ₹57,000",
    link: "https://ibps.in",
  },
  {
    id: "job_4",
    title: "रेलवे भर्ती बोर्ड - गैर-तकनीकी लोकप्रिय श्रेणियां (RRB NTPC)",
    org: "RRB (Railway Recruitment Board)",
    location: "रेलवे जोन (All India)",
    qualification: "कक्षा 12वीं या स्नातक डिग्री",
    ageLimit: "18 - 33 वर्ष",
    deadline: "30 सितंबर, 2026",
    salary: "₹19,900 - ₹35,400",
    link: "https://indianrailways.gov.in",
  },
];

export function getJobs(query = "") {
  if (!query) return JOBS;
  const q = query.toLowerCase();
  return JOBS.filter(
    (j) => j.title.toLowerCase().includes(q) || j.org.toLowerCase().includes(q),
  );
}
export default getJobs;
