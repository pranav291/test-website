'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTools, FaTrophy, FaLightbulb, FaNewspaper, FaClock, FaShareAlt, FaChevronRight } from 'react-icons/fa'
import { LanguageProvider } from '@/app/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const hiContent = {
  title: "दरभंगा ताइक्वांडो एसोसिएशन की ऐतिहासिक विशेष बैठक: आधुनिकीकरण और कैमूर राज्यस्तरीय प्रतियोगिता की विस्तृत रणनीति",
  date: "०५ अप्रैल २०२६",
  author: "DTA न्यूज़ डेस्क",
  readTime: "8 मिनट",
  intro: "आज दिनांक 05 अप्रैल 2026 को मिथिलांचल की हृदयस्थली दरभंगा में ताइक्वांडो के इतिहास का एक नया अध्याय लिखा गया। बिहार ताइक्वांडो एसोसिएशन के दिशा-निर्देशों के अनुपालन में, दरभंगा ताइक्वांडो एसोसिएशन की एक अत्यंत महत्वपूर्ण और ऐतिहासिक बैठक संस्कृत विश्वविद्यालय के कैंटीन प्रांगण में सुबह 11:00 बजे आयोजित की गई। इस उच्च-स्तरीय बैठक का उद्देश्य न केवल क्लब के सर्वांगीण विकास और आधुनिकीकरण पर चर्चा करना था, बल्कि आगामी 5 जून से 7 जून तक कैमूर में होने वाली 'राज्यस्तरीय ताइक्वांडो प्रतियोगिता' के लिए एक अभेद्य रणनीति तैयार करना भी था।",

  heading1: "बैठक का ऐतिहासिक महत्व और मुख्य मार्गदर्शक",
  p1: "यह कोई साधारण बैठक नहीं थी, बल्कि दरभंगा में मार्शल आर्ट्स और खेलों के भविष्य को एक नई दिशा देने वाला महामंथन था। इस सभा की अध्यक्षता और मुख्य मार्गदर्शन के लिए क्षेत्र के जाने-माने और प्रतिष्ठित व्यक्तित्व—समीर अभिषेक सर, डॉ. प्रेम कुमार निषाद, और राजीव कुमार जी उपस्थित रहे। उनके अनुभव और दूरदर्शिता ने इस बैठक को एक नई ऊर्जा प्रदान की।",
  p2: "समीर अभिषेक सर ने अपने संबोधन में कहा कि 'हमारा लक्ष्य केवल स्थानीय स्तर पर पदक जीतना नहीं है, बल्कि दरभंगा की माटी से ऐसे योद्धा तैयार करना है जो अंतर्राष्ट्रीय मंचों पर तिरंगा लहराएं।' वहीं डॉ. प्रेम कुमार निषाद ने खिलाड़ियों के शारीरिक और मानसिक स्वास्थ्य पर जोर देते हुए उन्हें अनुशासन का महत्व समझाया। राजीव कुमार जी ने संस्था के संगठनात्मक ढांचे को मजबूत करने के लिए बहुमूल्य सुझाव दिए। उनके साथ ही क्लब के सबसे अनुभवी खिलाड़ी एवं मुख्य कोच, सूरज कुमार और नवीन ने भी इस नीति-निर्धारण में सक्रिय रूप से भाग लिया।",

  heading2: "खिलाड़ियों का अतुलनीय उत्साह और उपस्थिति",
  p3: "बिहार ताइक्वांडो एसोसिएशन के स्पष्ट निर्देशों के अनुसार, इस बैठक में ब्लू बेल्ट से ऊपर के सभी सदस्यों की उपस्थिति अनिवार्य थी। इस आह्वान ने खिलाड़ियों में एक नई चेतना जगा दी।",
  p4: "बैठक में सीनियर और जूनियर खिलाड़ियों की ओर से भारी संख्या में उपस्थिति दर्ज की गई। जिनमें प्रमुख रूप से कन्हैया कुमार, राहुल कुमार, अर्जुन कुमार, मिहिर कुमार, शिवा कुमार, आनंद कुमार, सौरव कुमार, अन्नू कुमारी, आशुतोष कुमार और कुंदन कुमार उपस्थित थे। इन सभी खिलाड़ियों ने खेल के प्रति अपनी असीम निष्ठा का प्रदर्शन किया और कसम खाई कि वे कैमूर में होने वाले राज्यस्तरीय खेल में अपना सर्वश्रेष्ठ प्रदर्शन करेंगे।",

  heading3: "कैमूर राज्यस्तरीय प्रतियोगिता (5 से 7 जून) की मास्टर-प्लानिंग",
  p5: "आगामी 5 से 7 जून तक कैमूर जिले में एक भव्य राज्यस्तरीय ताइक्वांडो प्रतियोगिता का आयोजन होने जा रहा है। दरभंगा ताइक्वांडो एसोसिएशन इस प्रतियोगिता को एक अवसर के रूप में देख रहा है जहाँ हमारे खिलाड़ी अपनी छाप छोड़ सकते हैं।",
  p6: "बैठक में इसके लिए 'मिशन कैमूर' नाम से एक विस्तृत प्रशिक्षण योजना (Training Module) तैयार की गई है। इस योजना के तहत खिलाड़ियों की स्टेमिना बिल्डिंग, किकिंग टेक्निक्स, फुटवर्क और मानसिक मजबूती पर विशेष ध्यान दिया जाएगा। कोच सूरज कुमार के नेतृत्व में अगले 60 दिनों तक एक विशेष 'कठोर प्रशिक्षण शिविर' (Rigorous Training Camp) का आयोजन किया जाएगा।",

  heading4: "क्लब का आधुनिकीकरण और आगामी विकास योजनाएं",
  p7: "इस सभा का एक अन्य सबसे महत्वपूर्ण केंद्र बिंदु क्लब का आधुनिकीकरण (Modernization) और विस्तार रहा। सर्वसम्मति से निम्नलिखित ऐतिहासिक निर्णय लिए गए:",
  bullet1: "बुनियादी ढांचे का विकास (Infrastructure): खिलाड़ियों को अंतर्राष्ट्रीय स्तर की सुविधाएं प्रदान करने के लिए, क्लब में नए और उन्नत खेल उपकरण (Advanced Equipment), उच्च-गुणवत्ता वाले नए मैट (Tatami Mats), और एक बेहतर वातानुकूलित एवं सुरक्षित हॉल की व्यवस्था की जाएगी। इससे खिलाड़ियों को चोट लगने का डर कम होगा और वे बेहतर माहौल में अभ्यास कर सकेंगे।",
  bullet2: "प्रशिक्षण विस्तार और स्कूल इंटीग्रेशन: ताइक्वांडो को केवल क्लब तक सीमित नहीं रखा जाएगा। क्लब के सभी योग्य और सर्टिफाइड सीनियर खिलाड़ियों को दरभंगा के विभिन्न सरकारी और गैर-सरकारी स्कूलों में ट्रेनिंग कराने की जिम्मेदारी सौंपी जाएगी। इसका मुख्य उद्देश्य जमीनी स्तर (Grassroots Level) से प्रतिभाओं की खोज करना और खेल का दायरा विस्तृत करना है।",
  bullet3: "बाल विकास और महिला सशक्तिकरण: बच्चों की संख्या बढ़ाने और क्लब के सर्वांगीण विकास के लिए 'टैलेंट हंट प्रोग्राम' शुरू किया जाएगा। इसके अलावा, छात्राओं और महिलाओं के लिए विशेष 'आत्मरक्षा शिविर' (Self-Defense Camps) आयोजित किए जाएंगे।",

  heading5: "निष्कर्ष और भविष्य की किरण",
  p8: "5 अप्रैल 2026 की यह बैठक दरभंगा ताइक्वांडो के इतिहास में स्वर्ण अक्षरों में लिखी जाएगी। जब जुनून, अनुभव और सही दिशा का मिलन होता है, तो सफलता सुनिश्चित हो जाती है।",
  p9: "वरिष्ठ मार्गदर्शकों के आशीर्वाद और युवा खिलाड़ियों के जोश के साथ, दरभंगा ताइक्वांडो एसोसिएशन अब एक नई उड़ान भरने के लिए पूरी तरह तैयार है। कैमूर का राज्यस्तरीय खेल सिर्फ पहली मंजिल होगी; असली लक्ष्य तो आसमान छूना है।"
};

const hinglishContent = {
  title: "Darbhanga Taekwondo Association Ki Aitihasik Vishesh Baithak: Aadhunikikaran Aur Kaimur State Games Ki Vistrit Ranniti",
  date: "05 April 2026",
  author: "DTA News Desk",
  readTime: "8 min read",
  intro: "Aaj dinank 05 April 2026 ko Mithilanchal ki hridaysthali Darbhanga mein Taekwondo ke itihas ka ek naya adhyay likha gaya. Bihar Taekwondo Association ke disha-nirdeshon ke anupalan mein, Darbhanga Taekwondo Association ki ek atyant mahatvapurna aur aitihasik baithak Sanskrit Vishwavidyalaya ke canteen prangan mein subah 11:00 baje aayojit ki gayi. Is uchcha-astariya baithak ka uddeshya na keval club ke sarvangin vikas aur aadhunikikaran par charcha karna tha, balki aagami 5 June se 7 June tak Kaimur mein hone wali 'State Level Taekwondo Championship' ke liye ek abhedya ranniti taiyar karna bhi tha.",

  heading1: "Baithak Ka Aitihasik Mahatva Aur Mukhya Margdarshak",
  p1: "Yeh koi sadharan baithak nahi thi, balki Darbhanga mein martial arts aur khelon ke bhavishya ko ek nayi disha dene wala mahamanthan tha. Is sabha ki adhyakshta aur mukhya margdarshan ke liye kshetra ke jane-mane aur pratishthit vyaktitva—Sameer Abhishek Sir, Dr. Prem Kumar Nishad, aur Rajeev Kumar ji upasthit rahe. Unke anubhav aur doordarshita ne is baithak ko ek nayi urja pradan ki.",
  p2: "Sameer Abhishek Sir ne apne sambodhan mein kaha ki 'Hamara lakshya keval sthaniya sthar par padak jeetna nahi hai, balki Darbhanga ki maati se aise yoddha taiyar karna hai jo antarrashtriya manchon par tiranga lehrayein.' Wahin Dr. Prem Kumar Nishad ne khiladiyon ke sharirik aur mansik swasthya par zor dete hue unhein anushasan ka mahatva samjhaya. Rajeev Kumar ji ne sanstha ke sangathanatmak dhanche ko mazboot karne ke liye bahumulya suzhav diye. Unke sath hi club ke sabse anubhavi khiladi evam mukhya coach, Suraj Kumar aur Naveen ne bhi is niti-nirdharan mein sakriya roop se bhag liya.",

  heading2: "Khiladiyon Ka Atulniya Utsah Aur Upasthiti",
  p3: "Bihar Taekwondo Association ke spasht nirdeshon ke anusar, is baithak mein Blue Belt se upar ke sabhi sadasyon ki upasthiti anivarya thi. Is aahvaan ne khiladiyon mein ek nayi chetna jaga di.",
  p4: "Baithak mein senior aur junior khiladiyon ki or se bhari sankhya mein upasthiti darj ki gayi. Jinme pramukh roop se Kanhaiya Kumar, Rahul Kumar, Arjun Kumar, Mihir Kumar, Shiva Kumar, Anand Kumar, Sourav Kumar, Annu Kumari, Ashutosh Kumar, aur Kundan Kumar upasthit the. In sabhi khiladiyon ne khel ke prati apni aseem nishtha ka pradarshan kiya aur kasam khai ki ve Kaimur mein hone wale rajyastariya khel mein apna sarvashreshtha pradarshan karenge.",

  heading3: "Kaimur State Championship (5 se 7 June) Ki Master-Planning",
  p5: "Aagami 5 se 7 June tak Kaimur jile mein ek bhavya rajyastariya Taekwondo pratiyogita ka aayojan hone ja raha hai. Darbhanga Taekwondo Association is pratiyogita ko ek avsar ke roop mein dekh raha hai jahan hamare khiladi apni chhap chhod sakte hain.",
  p6: "Baithak mein iske liye 'Mission Kaimur' naam se ek vistrit prashikshan yojana (Training Module) taiyar ki gayi hai. Is yojana ke tahat khiladiyon ki stamina building, kicking techniques, footwork aur mansik majbooti par vishesh dhyan diya jayega. Coach Suraj Kumar ke netritva mein agle 60 dinon tak ek vishesh 'Kathor Prashikshan Shivir' (Rigorous Training Camp) ka aayojan kiya jayega.",

  heading4: "Club Ka Aadhunikikaran Aur Aagami Vikas Yojnaayein",
  p7: "Is sabha ka ek anya sabse mahatvapurna kendra bindu club ka aadhunikikaran (Modernization) aur vistar raha. Sarvasammati se nimnlikhit aitihasik nirnay liye gaye:",
  bullet1: "Buniyadi Dhaanche Ka Vikas (Infrastructure): Khiladiyon ko antarrashtriya sthar ki suvidhayein pradan karne ke liye, club mein naye aur unnat khel upkaran (Advanced Equipment), uchcha-gunwatta wale naye mats (Tatami Mats), aur ek behtar vatankoolit evam surakshit hall ki vyavastha ki jayegi. Isse khiladiyon ko chot lagne ka darr kam hoga aur ve behtar mahaul mein abhyas kar sakenge.",
  bullet2: "Prashikshan Vistar Aur School Integration: Taekwondo ko keval club tak simit nahi rakha jayega. Club ke sabhi yogya aur certified senior khiladiyon ko Darbhanga ke vibhinn sarkari aur gair-sarkari schoolon mein training karane ki zimmedari saumpi jayegi. Iska mukhya uddeshya jamini sthar (Grassroots Level) se pratibhaon ki khoj karna aur khel ka dayara vistrit karna hai.",
  bullet3: "Baal Vikas Aur Mahila Sashaktikaran: Bachchon ki sankhya badhane aur club ke sarvangin vikas ke liye 'Talent Hunt Program' shuru kiya jayega. Iske alava, chhatraon aur mahilaon ke liye vishesh 'Aatmraksha Shivir' (Self-Defense Camps) aayojit kiye jayenge.",

  heading5: "Nishkarsh Aur Bhavishya Ki Kiran",
  p8: "5 April 2026 ki yeh baithak Darbhanga Taekwondo ke itihas mein swarna aksharon mein likhi jayegi. Jab junoon, anubhav aur sahi disha ka milan hota hai, to safalta sunishchit ho jati hai.",
  p9: "Varishtha margdarshakon ke aashirwad aur yuva khiladiyon ke josh ke sath, Darbhanga Taekwondo Association ab ek nayi udaan bharne ke liye poori tarah taiyar hai. Kaimur ka rajyastariya khel sirf pehli manzil hogi; asli lakshya to aasman chhoona hai."
};

const enContent = {
  title: "Historic Special Meeting of Darbhanga Taekwondo Association: Mega Blueprint for Modernization and Kaimur State Championships",
  date: "April 05, 2026",
  author: "DTA News Desk",
  readTime: "8 min read",
  intro: "Today, on April 5, 2026, a new chapter was written in the history of Taekwondo in the heartland of Mithilanchal, Darbhanga. In compliance with the guidelines of the Bihar Taekwondo Association, an extremely crucial and historic meeting of the Darbhanga Taekwondo Association was organized at the Sanskrit University Canteen premises at 11:00 AM. The primary objective of this high-level assembly was not only to discuss the holistic development and modernization of the club but also to formulate an impenetrable strategy for the upcoming 'State Level Taekwondo Championship' scheduled to be held in Kaimur from June 5 to June 7.",

  heading1: "Historical Significance of the Meeting & Chief Mentors",
  p1: "This was not just an ordinary meeting; it was a mega brainstorming session aimed at giving a new direction to the future of martial arts and sports in Darbhanga. The meeting was chaired and guided by highly respected and renowned personalities of the region—Sameer Abhishek Sir, Dr. Prem Kumar Nishad, and Rajeev Kumar. Their vast experience and foresightedness injected a phenomenal new energy into the assembly.",
  p2: "In his powerful address, Sameer Abhishek Sir stated, 'Our goal is not merely to win medals at the local level, but to forge warriors from the soil of Darbhanga who will hoist the tricolor on international platforms.' Dr. Prem Kumar Nishad emphasized the physical and mental well-being of the players, teaching them the profound importance of discipline. Rajeev Kumar provided invaluable suggestions to strengthen the organizational framework of the academy. Alongside them, the club's most experienced player and head coach, Suraj Kumar, along with Naveen, actively participated in this massive policy-making session.",

  heading2: "Unparalleled Enthusiasm and Presence of Players",
  p3: "As per the strict directives of the Bihar Taekwondo Association, the attendance of all members holding a Blue Belt and above was mandatory. This clarion call awakened a massive wave of consciousness among the martial artists.",
  p4: "A remarkably large number of senior and junior players marked their presence. Prominent among attendees were Kanhaiya Kumar, Rahul Kumar, Arjun Kumar, Mihir Kumar, Shiva Kumar, Anand Kumar, Sourav Kumar, Annu Kumari, Ashutosh Kumar, and Kundan Kumar. Each of these dedicated players showcased their relentless devotion to the sport and took a solemn vow to deliver their absolute best performance at the upcoming state-level games in Kaimur.",

  heading3: "Master-Planning for Kaimur State Championship (June 5-7)",
  p5: "A grand State Level Taekwondo Championship is going to be organized in Kaimur district from the 5th to the 7th of June. The Darbhanga Taekwondo Association views this highly competitive tournament as a golden opportunity where our athletes can leave an indelible mark on the state's sporting map.",
  p6: "A comprehensive and aggressive training module named 'Mission Kaimur' has been formulated. Under this strategic plan, special emphasis will be laid on endurance building, advanced kicking techniques, agile footwork, and immense psychological strengthening. Under the expert leadership of Coach Suraj Kumar, a special 'Rigorous Training Camp' will be conducted over the next 60 days.",

  heading4: "Club Modernization and Future Development Plans",
  p7: "Another pivotal focal point of this grand assembly was the expansive modernization and geographical expansion of the club. The following historic decisions were unanimously passed:",
  bullet1: "Infrastructure Development: In order to provide international standard facilities to the combatants, the club will be equipped with new and highly advanced sports equipment, premium quality Tatami mats, and a superior, well-ventilated, and highly secure indoor training hall. This will drastically minimize injury risks and create an elite practice atmosphere.",
  bullet2: "Training Expansion & School Integration: The art of Taekwondo will no longer be restricted just to the club premises. All highly qualified and certified senior players of the club will be entrusted with the massive responsibility of conducting professional training sessions across various government and private schools in Darbhanga. The core objective is deep grassroots talent scouting and expanding the footprint of the sport.",
  bullet3: "Child Development and Women Empowerment: A massive 'Talent Hunt Program' will be initiated to exponentially increase the participation of young children. Furthermore, specialized and aggressive 'Self-Defense Camps' will be actively organized exclusively for female students and local women to foster true empowerment.",

  heading5: "Conclusion and A Ray of Future",
  p8: "The meeting held on April 5, 2026, will be etched in golden letters in the glorious history of Darbhanga Taekwondo. When unparalleled passion, profound experience, and precise direction converge, ultimate success becomes an absolute certainty.",
  p9: "Blessed by the senior mentors and fueled by the explosive enthusiasm of the young fighters, the Darbhanga Taekwondo Association is now completely geared up to take a massive leap into the future. The state-level championship in Kaimur is just the first milestone; the ultimate destination is the sky."
};

export default function NewsClientContent() {
  const [lang, setLang] = useState<'hinglish' | 'hi' | 'en'>('hinglish')

  let t = hinglishContent
  if (lang === 'hi') t = hiContent
  if (lang === 'en') t = enContent

  return (
    <LanguageProvider>
      <Navbar />
      <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Primary Content Area (Left Column) */}
            <article className="w-full lg:w-2/3 xl:w-3/4">
              
              {/* Language Toggle & Breadcrumbs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-6">
                <div className="flex text-xs font-bold uppercase tracking-widest text-primary gap-2">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <span className="text-white/30">/</span>
                  <Link href="/news" className="hover:text-white transition-colors">News</Link>
                  <span className="text-white/30">/</span>
                  <span className="text-white/50 truncate md:max-w-xs">{t.date}</span>
                </div>

                <div className="bg-[#1a1a1a] p-1 rounded-lg border border-white/10 flex text-sm font-bold uppercase tracking-wider overflow-x-auto">
                  <button 
                    onClick={() => setLang('hinglish')} 
                    className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${lang === 'hinglish' ? 'bg-primary text-white shadow-md' : 'text-white/50 hover:text-white'}`}
                  >
                    Hinglish
                  </button>
                  <button 
                    onClick={() => setLang('hi')} 
                    className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${lang === 'hi' ? 'bg-primary text-white shadow-md' : 'text-white/50 hover:text-white'}`}
                  >
                    हिन्दी
                  </button>
                  <button 
                    onClick={() => setLang('en')} 
                    className={`px-4 py-2 rounded-md transition-colors whitespace-nowrap ${lang === 'en' ? 'bg-primary text-white shadow-md' : 'text-white/50 hover:text-white'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Header Section */}
              <header className="mb-10 text-left">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-[1.2] uppercase tracking-tight mb-6">
                  {t.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-6 bg-[#111] p-4 rounded-xl border border-white/5 inline-flex shadow-sm">
                  <span className="flex items-center gap-2"><FaNewspaper /> {t.author}</span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-2 text-white/50"><FaCalendarAlt /> {t.date}</span>
                  <span className="text-white/30">•</span>
                  <span className="flex items-center gap-2 text-white/50"><FaClock /> {t.readTime}</span>
                </div>
              </header>

              {/* Hero Image */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/5"
              >
                <Image 
                  src="https://enhanceaiart.s3.us-west-2.amazonaws.com/uploads/6f305b94-9d5f-4145-afee-18e37a5e1d7e.jpeg"
                  alt="Darbhanga Taekwondo Association Historic Meeting"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none 
                              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight 
                              prose-p:text-white/80 prose-p:leading-relaxed prose-p:font-medium
                              prose-strong:text-white prose-strong:font-bold">
                
                <p className="text-xl md:text-2xl text-primary font-bold leading-relaxed mb-10">
                  {t.intro}
                </p>

                <div className="w-24 h-1 bg-white/10 my-12" />

                <h2 className="text-2xl md:text-3xl text-white flex items-center gap-4">
                  <FaUsers className="text-primary hidden sm:block" /> {t.heading1}
                </h2>
                <p>{t.p1}</p>
                <p>{t.p2}</p>

                <h2 className="text-2xl md:text-3xl text-white mt-12 mb-6">
                   {t.heading2}
                </h2>
                <div className="bg-[#1a1a1a] border-l-4 border-primary p-6 rounded-r-xl my-8">
                   <p className="m-0 italic text-white/90">
                     &quot;{t.p3}&quot;
                   </p>
                </div>
                <p>{t.p4}</p>

                <h2 className="text-2xl md:text-3xl text-white mt-12 mb-6 flex items-center gap-4">
                   <FaTrophy className="text-primary hidden sm:block" /> {t.heading3}
                </h2>
                <p>{t.p5}</p>
                <p>{t.p6}</p>

                <h2 className="text-2xl md:text-3xl text-white mt-12 mb-6 flex items-center gap-4">
                  <FaTools className="text-primary hidden sm:block" /> {t.heading4}
                </h2>
                <p>{t.p7}</p>

                <ul className="space-y-6 my-8 list-none pl-0">
                  <li className="flex items-start gap-4 tk-card-3d p-6 rounded-xl border border-white/5 shadow-md">
                     <div className="w-10 h-10 rounded bg-[#1f1f1f] flex items-center justify-center flex-shrink-0 mt-1 border border-primary/20">
                       <FaLightbulb className="text-primary" />
                     </div>
                     <span className="text-white/80 leading-relaxed block">
                       <strong className="text-white uppercase tracking-wider block mb-2 text-lg">{t.bullet1.split(':')[0]}</strong>
                       {t.bullet1.split(':')[1]}
                     </span>
                  </li>
                  <li className="flex items-start gap-4 tk-card-3d p-6 rounded-xl border border-white/5 shadow-md">
                     <div className="w-10 h-10 rounded bg-[#1f1f1f] flex items-center justify-center flex-shrink-0 mt-1 border border-amber-500/20">
                       <FaMapMarkerAlt className="text-amber-500" />
                     </div>
                     <span className="text-white/80 leading-relaxed block">
                       <strong className="text-white uppercase tracking-wider block mb-2 text-lg">{t.bullet2.split(':')[0]}</strong>
                       {t.bullet2.split(':')[1]}
                     </span>
                  </li>
                  <li className="flex items-start gap-4 tk-card-3d p-6 rounded-xl border border-white/5 shadow-md">
                     <div className="w-10 h-10 rounded bg-[#1f1f1f] flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/20">
                       <FaUsers className="text-blue-500" />
                     </div>
                     <span className="text-white/80 leading-relaxed block">
                       <strong className="text-white uppercase tracking-wider block mb-2 text-lg">{t.bullet3.split(':')[0]}</strong>
                       {t.bullet3.split(':')[1]}
                     </span>
                  </li>
                </ul>

                <h2 className="text-2xl md:text-3xl text-white mt-12 mb-6">
                  {t.heading5}
                </h2>
                <p>{t.p8}</p>
                <div className="tk-card-3d p-8 rounded-xl text-center mt-10 shadow-lg border border-primary/20">
                  <p className="text-xl font-bold text-white uppercase tracking-widest m-0 leading-relaxed">
                    &quot;{t.p9}&quot;
                  </p>
                </div>
              </div>

              {/* Share Box */}
              <div className="mt-16 flex items-center gap-4 border-t border-white/10 pt-8">
                <span className="text-sm font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                  <FaShareAlt /> Share Article
                </span>
                <div className="flex gap-2">
                   <button className="w-10 h-10 rounded-full bg-[#1da1f2]/10 text-[#1da1f2] hover:bg-[#1da1f2] hover:text-white transition-colors uppercase font-bold text-xs">TW</button>
                   <button className="w-10 h-10 rounded-full bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366] hover:text-white transition-colors uppercase font-bold text-xs">WA</button>
                   <button className="w-10 h-10 rounded-full bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white transition-colors uppercase font-bold text-xs">FB</button>
                </div>
              </div>
            </article>

            {/* Sidebar (Right Column) */}
            <aside className="w-full lg:w-1/3 xl:w-1/4 space-y-8">
              
              {/* About Club Widget */}
              <div className="tk-card-3d rounded-2xl p-6 border border-white/5">
                <h3 className="text-xl font-black text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-primary" /> Darbhanga Taekwondo
                </h3>
                <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                  Premium martial arts training in Darbhanga focusing on self-defense, confidence building, and competitive excellence.
                </p>
                <Link href="/#about" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors flex items-center gap-1">
                  Learn More <FaChevronRight size={10} />
                </Link>
              </div>

              {/* Related/Latest Events Widget */}
              <div className="tk-card-solid rounded-2xl p-6 border border-white/5 bg-[#141414]">
                <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  <Link href="/news" className="group block">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">June 5-7, 2026</span>
                    <h4 className="text-white group-hover:text-primary transition-colors text-sm font-bold leading-snug">Kaimur State Level Taekwondo Championship</h4>
                  </Link>
                  <div className="w-full h-[1px] bg-white/5" />
                  <Link href="/news" className="group block">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block mb-1">Coming Soon</span>
                    <h4 className="text-white group-hover:text-amber-500 transition-colors text-sm font-bold leading-snug">Women's Self-Defense Elite Camp</h4>
                  </Link>
                </div>
              </div>

              {/* Call to Action CTA */}
              <div className="rounded-2xl p-6 bg-gradient-to-b from-primary/20 to-transparent border border-primary/30 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[30px]" />
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Join The Elite</h3>
                <p className="text-sm text-white/80 font-light mb-6">
                  Ready to start your journey? Admissions are now open for the new batch.
                </p>
                <Link href="/#contact" className="block w-full py-3 bg-primary hover:bg-white hover:text-black transition-all text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-md">
                  Enroll Now
                </Link>
              </div>

            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </LanguageProvider>
  )
}
