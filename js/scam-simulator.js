/* ═══════════════════════════════════════════════════════════
   scam-simulator.js — Interactive Scam Awareness Simulator
   Real Nepali scam scenarios with age-based filtering
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Scam Scenario Database ─── */
  const scenarios = {
    student: [
      {
        sender: 'Unknown Number (+977-98XXXXXXX)',
        body_en: '🎉 Congratulations! You won a Samsung Galaxy S24 in the Ncell Lucky Draw! Click below to claim your prize:\n\n🔗 ncell-prize-winner.com.np/claim',
        body_np: '🎉 बधाई छ! तपाईंले Ncell Lucky Draw मा Samsung Galaxy S24 जित्नुभयो! आफ्नो पुरस्कार दाबी गर्न तल क्लिक गर्नुहोस्:\n\n🔗 ncell-prize-winner.com.np/claim',
        actions: [
          { label_en: '🖱️ Click the Link', label_np: '🖱️ लिंक क्लिक गर्नुहोस्', correct: false },
          { label_en: '🚫 Ignore & Delete', label_np: '🚫 बेवास्ता र मेट्नुहोस्', correct: true },
          { label_en: '📢 Report as Spam', label_np: '📢 स्प्यामको रूपमा रिपोर्ट', correct: true }
        ],
        feedback_correct_en: '✅ Great decision! This is a classic lottery scam. Ncell never sends prize links via SMS. The fake URL "ncell-prize-winner.com.np" is designed to steal your personal data.',
        feedback_correct_np: '✅ राम्रो निर्णय! यो एक क्लासिक लटरी स्क्याम हो। Ncell ले कहिल्यै SMS मार्फत पुरस्कार लिंक पठाउँदैन। नक्कली URL "ncell-prize-winner.com.np" तपाईंको व्यक्तिगत डेटा चोर्न डिजाइन गरिएको हो।',
        feedback_wrong_en: '❌ Danger! This is a phishing scam. Clicking would take you to a fake website that steals your personal information. Real prize notifications never come via random SMS with suspicious links.',
        feedback_wrong_np: '❌ खतरा! यो फिसिङ स्क्याम हो। क्लिक गर्दा तपाईंको व्यक्तिगत जानकारी चोर्ने नक्कली वेबसाइटमा लैजान्छ। वास्तविक पुरस्कार सूचनाहरू कहिल्यै शंकास्पद लिंकसहितको SMS बाट आउँदैनन्।'
      },
      {
        sender: 'Message on Facebook Messenger',
        body_en: '👋 Hey! I found your photos on this website. Is this really you?? 😱\n\n🔗 check-your-photos-np.xyz/view',
        body_np: '👋 हे! मैले यो वेबसाइटमा तपाईंको फोटो फेला पारें। के यो साँच्चै तपाईं हो?? 😱\n\n🔗 check-your-photos-np.xyz/view',
        actions: [
          { label_en: '🖱️ Click to Check', label_np: '🖱️ जाँच गर्न क्लिक', correct: false },
          { label_en: '🚫 Ignore Message', label_np: '🚫 सन्देश बेवास्ता', correct: true },
          { label_en: '🔒 Block & Report', label_np: '🔒 ब्लक र रिपोर्ट', correct: true }
        ],
        feedback_correct_en: '✅ Smart move! This is a classic "curiosity trap" scam on Messenger. The link leads to a phishing page that captures your Facebook login credentials. Never click suspicious links, even from friends — their accounts may be hacked.',
        feedback_correct_np: '✅ बुद्धिमानी कदम! यो मेसेन्जरमा एक क्लासिक "जिज्ञासा जाल" स्क्याम हो। लिंकले तपाईंको Facebook लगइन विवरण क्याप्चर गर्ने फिसिङ पृष्ठमा लैजान्छ। शंकास्पद लिंकहरूमा कहिल्यै क्लिक नगर्नुहोस्।',
        feedback_wrong_en: '❌ This would hack your Facebook account! The link takes you to a fake Facebook login page. Once you enter your credentials, the scammer gets full access to your account and sends the same message to all your friends.',
        feedback_wrong_np: '❌ यसले तपाईंको Facebook खाता ह्याक गर्नेछ! लिंकले तपाईंलाई नक्कली Facebook लगइन पृष्ठमा लैजान्छ। तपाईंले विवरण प्रविष्ट गरेपछि, स्क्यामरले तपाईंको खातामा पूर्ण पहुँच पाउँछ।'
      },
      {
        sender: 'Instagram DM from "scholarship_nepal_official"',
        body_en: '📚 Exclusive scholarship opportunity for Nepali students!\n\nFull scholarship to study in Australia 🇦🇺\nAge: 18-25\nNo IELTS required!\n\nJust pay Rs 5,000 processing fee.\nDM us your citizenship photo + bank details to apply! ✅',
        body_np: '📚 नेपाली विद्यार्थीहरूको लागि विशेष छात्रवृत्ति अवसर!\n\nअस्ट्रेलियामा पढ्न पूर्ण छात्रवृत्ति 🇦🇺\nउमेर: १८-२५\nIELTS आवश्यक छैन!\n\nकेवल रु ५,००० प्रशोधन शुल्क तिर्नुहोस्।\nआवेदन गर्न आफ्नो नागरिकता फोटो + बैंक विवरण DM गर्नुहोस्! ✅',
        actions: [
          { label_en: '💰 Pay & Apply', label_np: '💰 तिर्नुहोस् र आवेदन', correct: false },
          { label_en: '🔍 Verify First', label_np: '🔍 पहिले प्रमाणित गर्नुहोस्', correct: true },
          { label_en: '📢 Report Account', label_np: '📢 खाता रिपोर्ट गर्नुहोस्', correct: true }
        ],
        feedback_correct_en: '✅ Excellent thinking! Legitimate scholarships NEVER ask for processing fees or citizenship photos via Instagram DMs. Always verify through official university websites or the Nepal government\'s scholarship portal.',
        feedback_correct_np: '✅ उत्कृष्ट सोच! वैध छात्रवृत्तिहरूले कहिल्यै Instagram DM मार्फत प्रशोधन शुल्क वा नागरिकता फोटो माग्दैनन्। सधैं आधिकारिक विश्वविद्यालय वेबसाइट वा नेपाल सरकारको छात्रवृत्ति पोर्टल मार्फत प्रमाणित गर्नुहोस्।',
        feedback_wrong_en: '❌ This is a scholarship scam! You\'d lose Rs 5,000 AND hand over your citizenship details to criminals. They could use your identity for fraud. No real scholarship asks for money or sensitive documents via Instagram.',
        feedback_wrong_np: '❌ यो छात्रवृत्ति स्क्याम हो! तपाईंले रु ५,००० गुमाउनुहुनेछ र अपराधीहरूलाई नागरिकताको विवरण दिनुहुनेछ। कुनै पनि वास्तविक छात्रवृत्तिले Instagram मार्फत पैसा वा संवेदनशील कागजातहरू माग्दैन।'
      },
      {
        sender: 'WhatsApp Group: "Online Earning Nepal 🤑"',
        body_en: '💰 EARN Rs 3,000–10,000 DAILY! 💰\n\nJust watch YouTube videos & give ratings!\n✅ Work from home\n✅ No experience needed\n✅ Start today!\n\nInvestment required: Rs 2,000 only\nContact admin: +977-98XXXXXXX',
        body_np: '💰 दैनिक रु ३,०००–१०,००० कमाउनुहोस्! 💰\n\nYouTube भिडियो हेर्नुहोस् र रेटिङ दिनुहोस्!\n✅ घरबाटै काम\n✅ अनुभव आवश्यक छैन\n✅ आज नै सुरु गर्नुहोस्!\n\nलगानी: केवल रु २,०००\nसम्पर्क: +977-98XXXXXXX',
        actions: [
          { label_en: '💰 Invest & Start', label_np: '💰 लगानी र सुरु', correct: false },
          { label_en: '🚫 Leave Group', label_np: '🚫 समूह छोड्नुहोस्', correct: true },
          { label_en: '📢 Report Group', label_np: '📢 समूह रिपोर्ट', correct: true }
        ],
        feedback_correct_en: '✅ Good call! This is a "task-based" scam that\'s extremely common in Nepal. After you invest Rs 2,000, they\'ll show fake earnings and ask for more money to "unlock withdrawals." Thousands of Nepalis have lost money this way.',
        feedback_correct_np: '✅ राम्रो निर्णय! यो नेपालमा अत्यन्त सामान्य "कार्य-आधारित" स्क्याम हो। रु २,००० लगानी गरेपछि, नक्कली कमाइ देखाउँछन् र "निकासी अनलक" गर्न थप पैसा माग्छन्। हजारौं नेपालीले यसरी पैसा गुमाएका छन्।',
        feedback_wrong_en: '❌ Trap! No legitimate job pays Rs 10,000/day for watching videos. After your initial Rs 2,000 payment, they\'ll show fake earnings and demand more money to "unlock" your balance. It\'s a Ponzi scheme targeting young, unemployed Nepalis.',
        feedback_wrong_np: '❌ जाल! कुनै वैध कामले भिडियो हेर्दैमा दैनिक रु १०,००० तिर्दैन। प्रारम्भिक रु २,००० भुक्तानी पछि, नक्कली कमाइ देखाउँछन् र शेष रकम "अनलक" गर्न थप पैसा माग्छन्।'
      },
      {
        sender: 'SMS from "BANK-ALERT"',
        body_en: '⚠️ Your bank account has been temporarily suspended due to suspicious activity.\n\nVerify your identity NOW to restore access:\n🔗 nepal-bank-verify.com/restore\n\nFailure to verify within 24 hours will result in permanent account closure.',
        body_np: '⚠️ शंकास्पद गतिविधिका कारण तपाईंको बैंक खाता अस्थायी रूपमा निलम्बित गरिएको छ।\n\nपहुँच पुनर्स्थापना गर्न अहिले नै पहिचान प्रमाणित गर्नुहोस्:\n🔗 nepal-bank-verify.com/restore\n\n२४ घण्टाभित्र प्रमाणित नगरे स्थायी खाता बन्द हुनेछ।',
        actions: [
          { label_en: '🖱️ Verify Now', label_np: '🖱️ अहिले प्रमाणित', correct: false },
          { label_en: '📞 Call Your Bank', label_np: '📞 बैंकमा फोन गर्नुहोस्', correct: true },
          { label_en: '🚫 Ignore & Delete', label_np: '🚫 बेवास्ता र मेट्नुहोस्', correct: true }
        ],
        feedback_correct_en: '✅ Perfect response! Banks in Nepal never send suspension notices via SMS with links. Always call your bank directly using the number on your card or visit your nearest branch to verify any security alerts.',
        feedback_correct_np: '✅ उत्तम प्रतिक्रिया! नेपालका बैंकहरूले कहिल्यै लिंकसहित SMS मार्फत निलम्बन सूचना पठाउँदैनन्। सधैं आफ्नो कार्डमा भएको नम्बरबाट बैंकमा सोझै फोन गर्नुहोस् वा सुरक्षा अलर्ट प्रमाणित गर्न नजिकैको शाखामा जानुहोस्।',
        feedback_wrong_en: '❌ This is a phishing attack! The link leads to a fake banking website designed to steal your login credentials and OTP. Real banks will NEVER ask you to click a link in an SMS. Call your bank directly if you\'re concerned.',
        feedback_wrong_np: '❌ यो फिसिङ आक्रमण हो! लिंकले तपाईंको लगइन विवरण र OTP चोर्न डिजाइन गरिएको नक्कली बैंकिङ वेबसाइटमा लैजान्छ। वास्तविक बैंकले कहिल्यै SMS मा लिंक क्लिक गर्न भन्दैन।'
      }
    ],
    parent: [
      {
        sender: 'SMS from +977-98XXXXXXX',
        body_en: '🏦 eSewa Alert: Rs 25,000 has been sent to your account by RAJESH SHARMA.\n\nClick to confirm receipt:\n🔗 esewa-verify.com.np/confirm\n\n⚠️ If not confirmed in 1 hour, amount will be reversed.',
        body_np: '🏦 eSewa अलर्ट: राजेश शर्माद्वारा तपाईंको खातामा रु २५,००० पठाइएको छ।\n\nरसिद पुष्टि गर्न क्लिक गर्नुहोस्:\n🔗 esewa-verify.com.np/confirm\n\n⚠️ १ घण्टामा पुष्टि नगरे रकम फिर्ता हुनेछ।',
        actions: [
          { label_en: '🖱️ Click to Confirm', label_np: '🖱️ पुष्टि गर्न क्लिक', correct: false },
          { label_en: '📱 Check eSewa App', label_np: '📱 eSewa एप जाँच', correct: true },
          { label_en: '🚫 Ignore & Delete', label_np: '🚫 बेवास्ता र मेट्नुहोस्', correct: true }
        ],
        feedback_correct_en: '✅ Well done! Fake eSewa/Khalti payment messages are one of the most common scams in Nepal. Always check your actual eSewa app to verify transactions. eSewa never sends confirmation links via SMS.',
        feedback_correct_np: '✅ शाबास! नक्कली eSewa/Khalti भुक्तानी सन्देशहरू नेपालमा सबैभन्दा सामान्य स्क्यामहरू मध्ये एक हो। कारोबार प्रमाणित गर्न सधैं आफ्नो eSewa एप जाँच गर्नुहोस्। eSewa ले कहिल्यै SMS मार्फत पुष्टि लिंक पठाउँदैन।',
        feedback_wrong_en: '❌ This is a fake eSewa message! The link leads to a phishing site that will steal your eSewa login and PIN. Always verify transactions directly in the eSewa app. This scam has affected thousands of parents in Nepal.',
        feedback_wrong_np: '❌ यो नक्कली eSewa सन्देश हो! लिंकले तपाईंको eSewa लगइन र PIN चोर्ने फिसिङ साइटमा लैजान्छ। सधैं eSewa एपमा सोझै कारोबार प्रमाणित गर्नुहोस्।'
      },
      {
        sender: 'Phone Call Transcript',
        body_en: '📞 "Namaste, I am calling from Nepal Telecom. Your SIM is about to be blocked due to pending KYC verification. Please share your citizenship number and OTP to verify your account immediately or your number will be deactivated in 2 hours."',
        body_np: '📞 "नमस्ते, म नेपाल टेलिकमबाट बोलिरहेको छु। KYC प्रमाणीकरण बाँकी भएकाले तपाईंको SIM ब्लक हुन लागेको छ। कृपया तुरुन्त आफ्नो नागरिकता नम्बर र OTP साझा गर्नुहोस् नत्र तपाईंको नम्बर २ घण्टामा निष्क्रिय हुनेछ।"',
        actions: [
          { label_en: '📱 Share OTP', label_np: '📱 OTP साझा गर्नुहोस्', correct: false },
          { label_en: '📞 Hang Up', label_np: '📞 फोन काट्नुहोस्', correct: true },
          { label_en: '🏪 Visit NTC Office', label_np: '🏪 NTC कार्यालय जानुहोस्', correct: true }
        ],
        feedback_correct_en: '✅ Right decision! Nepal Telecom NEVER asks for OTP or citizenship details over phone calls. This is a social engineering scam. For any KYC issues, visit your nearest NTC service center in person.',
        feedback_correct_np: '✅ सही निर्णय! नेपाल टेलिकमले कहिल्यै फोन कलमा OTP वा नागरिकता विवरण माग्दैन। यो सोशल इन्जिनियरिङ स्क्याम हो। कुनै पनि KYC मुद्दाको लागि, नजिकैको NTC सेवा केन्द्रमा व्यक्तिगत रूपमा जानुहोस्।',
        feedback_wrong_en: '❌ Never share OTP with anyone over the phone! This is a social engineering attack. The caller would use your OTP to access your mobile banking or digital wallet. Nepal Telecom does KYC only at their offices.',
        feedback_wrong_np: '❌ कहिल्यै फोनमा कसैलाई OTP साझा नगर्नुहोस्! यो सोशल इन्जिनियरिङ आक्रमण हो। कलरले तपाईंको मोबाइल बैंकिङ वा डिजिटल वालेट पहुँच गर्न तपाईंको OTP प्रयोग गर्नेछ।'
      },
      {
        sender: 'Facebook Message from "Daughter\'s Account"',
        body_en: '👧 "Mom/Dad, my phone is broken and I\'m using my friend\'s phone. I urgently need Rs 15,000 for college fees. Please send it to this Khalti account: 98XXXXXXXX. Please hurry, deadline is today! 🙏"',
        body_np: '👧 "बुबा/आमा, मेरो फोन बिग्रिएको छ र म साथीको फोन प्रयोग गरिरहेको छु। कलेज शुल्कको लागि मलाई तुरुन्त रु १५,००० चाहिन्छ। कृपया यो Khalti खातामा पठाउनुहोस्: 98XXXXXXXX। कृपया छिटो गर्नुहोस्, आज अन्तिम मिति हो! 🙏"',
        actions: [
          { label_en: '💰 Send Money Now', label_np: '💰 अहिले पैसा पठाउनुहोस्', correct: false },
          { label_en: '📞 Call Your Child', label_np: '📞 बच्चालाई फोन गर्नुहोस्', correct: true },
          { label_en: '🤔 Ask Verification Q', label_np: '🤔 प्रमाणीकरण प्रश्न सोध्नुहोस्', correct: true }
        ],
        feedback_correct_en: '✅ Excellent parenting instinct! This is an impersonation scam. Always verify by calling your child directly on their phone number. Ask personal questions only your child would know. Scammers hack accounts and target parents.',
        feedback_correct_np: '✅ उत्कृष्ट अभिभावक सहज बोध! यो नक्कलीकरण स्क्याम हो। सधैं आफ्नो बच्चाको फोन नम्बरमा सोझै फोन गरेर प्रमाणित गर्नुहोस्। तपाईंको बच्चाले मात्र जान्ने व्यक्तिगत प्रश्नहरू सोध्नुहोस्।',
        feedback_wrong_en: '❌ This is likely a scam! Scammers hack Facebook accounts or create fake profiles to trick parents into sending money. ALWAYS call your child directly before sending money. The Khalti number belongs to the scammer.',
        feedback_wrong_np: '❌ यो सम्भवतः स्क्याम हो! स्क्यामरहरूले Facebook खाता ह्याक गर्छन् वा अभिभावकलाई पैसा पठाउन ठग्न नक्कली प्रोफाइल बनाउँछन्। पैसा पठाउनुअघि सधैं बच्चालाई सोझै फोन गर्नुहोस्।'
      },
      {
        sender: 'Viber Message',
        body_en: '🏥 "Nepal Government Free Health Checkup Camp!\n\nRegister now for free comprehensive health checkup worth Rs 50,000.\n\nLimited slots! Register with your citizenship number and bank account details.\n\n🔗 nepal-health-camp.org/register"',
        body_np: '🏥 "नेपाल सरकार निःशुल्क स्वास्थ्य जाँच शिविर!\n\nरु ५०,००० बराबरको निःशुल्क व्यापक स्वास्थ्य जाँचको लागि दर्ता गर्नुहोस्।\n\nसीमित ठाउँ! नागरिकता नम्बर र बैंक खाता विवरणसहित दर्ता गर्नुहोस्।\n\n🔗 nepal-health-camp.org/register"',
        actions: [
          { label_en: '📝 Register Now', label_np: '📝 अहिले दर्ता', correct: false },
          { label_en: '🏥 Verify with Hospital', label_np: '🏥 अस्पतालसँग प्रमाणित', correct: true },
          { label_en: '🚫 Ignore Message', label_np: '🚫 सन्देश बेवास्ता', correct: true }
        ],
        feedback_correct_en: '✅ Smart! Government health camps never require bank account details for registration. This scam targets older citizens by pretending to be government health services. Always verify through official government websites.',
        feedback_correct_np: '✅ बुद्धिमानी! सरकारी स्वास्थ्य शिविरले दर्ताको लागि कहिल्यै बैंक खाता विवरण आवश्यक पार्दैन। यो स्क्यामले सरकारी स्वास्थ्य सेवा भएको बहाना गरेर वृद्ध नागरिकहरूलाई लक्षित गर्छ।',
        feedback_wrong_en: '❌ This is a data harvesting scam! Government health programs NEVER ask for bank details. Your citizenship and bank info would be used for identity theft or unauthorized transactions.',
        feedback_wrong_np: '❌ यो डेटा संकलन स्क्याम हो! सरकारी स्वास्थ्य कार्यक्रमले कहिल्यै बैंक विवरण माग्दैन। तपाईंको नागरिकता र बैंक जानकारी पहिचान चोरी वा अनाधिकृत कारोबारको लागि प्रयोग हुनेछ।'
      },
      {
        sender: 'SMS from "NRB-ALERT"',
        body_en: '🏦 Nepal Rastra Bank Notice:\n\nUnder new digital Nepal policy, all citizens must link Aadhaar/Citizenship to bank accounts by THIS WEEK.\n\nComplete verification:\n🔗 nrb-verify-nepal.com/link\n\nPenalty of Rs 10,000 for non-compliance.',
        body_np: '🏦 नेपाल राष्ट्र बैंक सूचना:\n\nनयाँ डिजिटल नेपाल नीति अन्तर्गत, सबै नागरिकले यो हप्ता भित्र आधार/नागरिकता बैंक खातासँग लिंक गर्नुपर्छ।\n\nप्रमाणीकरण पूरा गर्नुहोस्:\n🔗 nrb-verify-nepal.com/link\n\nपालना नगरेमा रु १०,००० जरिवाना।',
        actions: [
          { label_en: '🖱️ Complete Now', label_np: '🖱️ अहिले पूरा गर्नुहोस्', correct: false },
          { label_en: '🏦 Visit Your Bank', label_np: '🏦 आफ्नो बैंक जानुहोस्', correct: true },
          { label_en: '📞 Call NRB Helpline', label_np: '📞 NRB हेल्पलाइन कल', correct: true }
        ],
        feedback_correct_en: '✅ Right choice! Nepal Rastra Bank communicates only through official channels, not SMS links. This scam uses urgency and fear of penalties to trick people. Always visit your bank in person for any verification requirements.',
        feedback_correct_np: '✅ सही छनोट! नेपाल राष्ट्र बैंकले आधिकारिक च्यानलहरू मार्फत मात्र सञ्चार गर्छ, SMS लिंकबाट होइन। यो स्क्यामले मानिसहरूलाई ठग्न जरिवानाको डर र तत्कालता प्रयोग गर्छ।',
        feedback_wrong_en: '❌ Phishing scam! The NRB never sends verification links via SMS. The website "nrb-verify-nepal.com" is fake and designed to steal your banking credentials. Real policies are announced through official NRB circulars and your bank.',
        feedback_wrong_np: '❌ फिसिङ स्क्याम! NRB ले कहिल्यै SMS मार्फत प्रमाणीकरण लिंक पठाउँदैन। "nrb-verify-nepal.com" वेबसाइट नक्कली हो र तपाईंको बैंकिङ विवरण चोर्न डिजाइन गरिएको हो।'
      }
    ],
    professional: [
      {
        sender: 'Email: hr@nepal-consulting-group.com',
        body_en: '📧 Dear Professional,\n\nWe have an exciting job opportunity at Nepal Consulting Group. Annual package: Rs 25-35 Lakhs.\n\nPlease fill this application form with your PAN number, bank account, and citizenship details:\n\n🔗 nepal-consulting-careers.com/apply\n\nImmediate joining. No interview required.',
        body_np: '📧 प्रिय पेशेवर,\n\nनेपाल कन्सल्टिङ ग्रुपमा रोमाञ्चक जागिर अवसर छ। वार्षिक प्याकेज: रु २५-३५ लाख।\n\nकृपया PAN नम्बर, बैंक खाता, र नागरिकता विवरणसहित यो आवेदन फारम भर्नुहोस्:\n\n🔗 nepal-consulting-careers.com/apply\n\nतुरुन्त जोइनिङ। अन्तर्वार्ता आवश्यक छैन।',
        actions: [
          { label_en: '📝 Fill Application', label_np: '📝 आवेदन भर्नुहोस्', correct: false },
          { label_en: '🔍 Research Company', label_np: '🔍 कम्पनी अनुसन्धान', correct: true },
          { label_en: '🚫 Mark as Spam', label_np: '🚫 स्प्याम चिन्ह लगाउनुहोस्', correct: true }
        ],
        feedback_correct_en: '✅ Professional instinct! Legitimate companies never ask for PAN, bank, or citizenship details in initial applications. "No interview required" for a high-paying job is a major red flag. Always research companies on official registries.',
        feedback_correct_np: '✅ पेशेवर सहज बोध! वैध कम्पनीहरूले प्रारम्भिक आवेदनमा कहिल्यै PAN, बैंक, वा नागरिकता विवरण माग्दैनन्। उच्च तलबको कामको लागि "अन्तर्वार्ता आवश्यक छैन" एक प्रमुख रेड फ्ल्याग हो।',
        feedback_wrong_en: '❌ Job scam targeting professionals! The company likely doesn\'t exist. Your PAN and bank details would be used for identity theft or financial fraud. Legitimate employers conduct interviews and never ask for banking info upfront.',
        feedback_wrong_np: '❌ पेशेवरहरूलाई लक्षित जागिर स्क्याम! कम्पनी सम्भवतः अस्तित्वमा छैन। तपाईंको PAN र बैंक विवरण पहिचान चोरी वा वित्तीय धोखाधडीको लागि प्रयोग हुनेछ।'
      },
      {
        sender: 'LinkedIn Message',
        body_en: '💼 "Hi! I\'m a recruiter from a top MNC. Your profile is impressive.\n\nWe have a Senior Manager role with 3x your current salary.\n\nPlease install this app for the video interview:\n🔗 nepaljob-interview-app.com/download\n\nInterview scheduled for tomorrow 10 AM."',
        body_np: '💼 "नमस्ते! म एक शीर्ष MNC को रिक्रुटर हुँ। तपाईंको प्रोफाइल प्रभावशाली छ।\n\nहामीसँग तपाईंको हालको तलबको ३ गुणा Senior Manager भूमिका छ।\n\nकृपया भिडियो अन्तर्वार्ताको लागि यो एप इन्स्टल गर्नुहोस्:\n🔗 nepaljob-interview-app.com/download\n\nअन्तर्वार्ता भोलि बिहान १० बजे।"',
        actions: [
          { label_en: '📱 Download App', label_np: '📱 एप डाउनलोड', correct: false },
          { label_en: '🔍 Verify Recruiter', label_np: '🔍 रिक्रुटर प्रमाणित', correct: true },
          { label_en: '🚫 Decline & Block', label_np: '🚫 अस्वीकार र ब्लक', correct: true }
        ],
        feedback_correct_en: '✅ Sharp thinking! Legitimate recruiters use standard video call platforms (Zoom, Teams, Google Meet). Never download unknown apps — they may contain malware that steals your data and business contacts.',
        feedback_correct_np: '✅ तीक्ष्ण सोच! वैध रिक्रुटरहरूले मानक भिडियो कल प्लेटफर्महरू (Zoom, Teams, Google Meet) प्रयोग गर्छन्। कहिल्यै अज्ञात एपहरू डाउनलोड नगर्नुहोस् — तिनीहरूमा तपाईंको डेटा चोर्ने मालवेयर हुन सक्छ।',
        feedback_wrong_en: '❌ The app is malware! It would give hackers access to your phone, contacts, messages, and banking apps. Real interviews use Zoom, MS Teams, or Google Meet — never custom apps from unknown websites.',
        feedback_wrong_np: '❌ एप मालवेयर हो! यसले ह्याकरहरूलाई तपाईंको फोन, सम्पर्कहरू, सन्देशहरू, र बैंकिङ एपहरूमा पहुँच दिनेछ। वास्तविक अन्तर्वार्ताहरूले Zoom, MS Teams, वा Google Meet प्रयोग गर्छन्।'
      },
      {
        sender: 'Email: support@nepal-tax-portal.gov.np.co',
        body_en: '📧 IRD Nepal Tax Refund Notice\n\nDear Taxpayer,\n\nYou are eligible for a tax refund of Rs 47,500 for FY 2081/82.\n\nTo process your refund, confirm your bank details:\n🔗 ird-nepal-refund.com/claim\n\nRefund expires in 48 hours.\n\n— Inland Revenue Department',
        body_np: '📧 IRD नेपाल कर फिर्ताको सूचना\n\nप्रिय करदाता,\n\nतपाईं आ.व. २०८१/८२ को लागि रु ४७,५०० कर फिर्ताको लागि योग्य हुनुहुन्छ।\n\nफिर्ता प्रशोधन गर्न, बैंक विवरण पुष्टि गर्नुहोस्:\n🔗 ird-nepal-refund.com/claim\n\nफिर्ता ४८ घण्टामा समाप्त हुन्छ।\n\n— आन्तरिक राजस्व विभाग',
        actions: [
          { label_en: '💰 Claim Refund', label_np: '💰 फिर्ता दाबी', correct: false },
          { label_en: '🔍 Check Official IRD', label_np: '🔍 आधिकारिक IRD जाँच', correct: true },
          { label_en: '📢 Report Phishing', label_np: '📢 फिसिङ रिपोर्ट', correct: true }
        ],
        feedback_correct_en: '✅ Well spotted! Notice the fake domain "nepal-tax-portal.gov.np.co" — the real IRD domain is ird.gov.np. Tax refunds are processed through your official filings, not email links. This targets working professionals during tax season.',
        feedback_correct_np: '✅ राम्रो पहिचान! नक्कली डोमेन "nepal-tax-portal.gov.np.co" ध्यान दिनुहोस् — वास्तविक IRD डोमेन ird.gov.np हो। कर फिर्ता तपाईंको आधिकारिक फाइलिङ मार्फत प्रशोधन हुन्छ, इमेल लिंकबाट होइन।',
        feedback_wrong_en: '❌ Phishing scam! The domain ".gov.np.co" is NOT a government domain. Your bank details would be stolen. The IRD processes refunds through official tax filings at ird.gov.np, never through email links.',
        feedback_wrong_np: '❌ फिसिङ स्क्याम! डोमेन ".gov.np.co" सरकारी डोमेन होइन। तपाईंको बैंक विवरण चोरी हुनेछ। IRD ले ird.gov.np मा आधिकारिक कर फाइलिङ मार्फत फिर्ता प्रशोधन गर्छ।'
      },
      {
        sender: 'WhatsApp from +977-1-XXXXXXX',
        body_en: '📊 "Hello, we are from the Digital Nepal Investment Authority. A new government-backed cryptocurrency (Nepal Coin) is launching soon.\n\nEarly investors get 500% returns guaranteed!\n\nMinimum investment: Rs 50,000\nTransfer to: Nepal Investment Bank, A/C: XXXXX\n\nLimited time offer. Contact us for more details."',
        body_np: '📊 "नमस्ते, हामी डिजिटल नेपाल लगानी प्राधिकरणबाट हौं। एउटा नयाँ सरकार-समर्थित क्रिप्टोकरेन्सी (Nepal Coin) चाँडै सुरु हुँदैछ।\n\nप्रारम्भिक लगानीकर्ताले ५०० प्रतिशत प्रतिफल ग्यारेन्टी पाउँछन्!\n\nन्यूनतम लगानी: रु ५०,०००\nट्रान्सफर: नेपाल इन्भेस्टमेन्ट बैंक, A/C: XXXXX\n\nसीमित समय अफर।"',
        actions: [
          { label_en: '💰 Invest Now', label_np: '💰 अहिले लगानी', correct: false },
          { label_en: '🔍 Verify Authority', label_np: '🔍 प्राधिकरण प्रमाणित', correct: true },
          { label_en: '📢 Report to Police', label_np: '📢 प्रहरीमा रिपोर्ट', correct: true }
        ],
        feedback_correct_en: '✅ Great judgment! Nepal has NO government-backed cryptocurrency. "Digital Nepal Investment Authority" doesn\'t exist. No legitimate investment guarantees 500% returns. This Ponzi scheme has scammed professionals out of crores in Nepal.',
        feedback_correct_np: '✅ उत्कृष्ट निर्णय! नेपालमा कुनै सरकार-समर्थित क्रिप्टोकरेन्सी छैन। "डिजिटल नेपाल लगानी प्राधिकरण" अस्तित्वमा छैन। कुनै वैध लगानीले ५०० प्रतिशत प्रतिफल ग्यारेन्टी गर्दैन।',
        feedback_wrong_en: '❌ Investment scam! There is NO government cryptocurrency in Nepal, and no legitimate investment offers 500% guaranteed returns. This is a Ponzi scheme. The "authority" is completely fake. You would lose your entire Rs 50,000.',
        feedback_wrong_np: '❌ लगानी स्क्याम! नेपालमा कुनै सरकारी क्रिप्टोकरेन्सी छैन, र कुनै वैध लगानीले ५०० प्रतिशत ग्यारेन्टी प्रतिफल दिँदैन। यो पोन्जी योजना हो। तपाईंले आफ्नो सम्पूर्ण रु ५०,००० गुमाउनुहुनेछ।'
      },
      {
        sender: 'Email: admin@company-nepal.com',
        body_en: '📧 URGENT: CEO Request\n\nHi,\n\nI\'m in a confidential meeting and can\'t talk. I need you to urgently purchase 5 Google Play gift cards worth Rs 10,000 each for a client gift.\n\nBuy them and send me the codes ASAP.\n\nDo not discuss this with anyone else.\n\n— [Your CEO\'s Name]',
        body_np: '📧 अत्यावश्यक: CEO अनुरोध\n\nनमस्ते,\n\nम गोप्य बैठकमा छु र कुरा गर्न सक्दिन। मलाई तुरुन्त ग्राहक उपहारको लागि रु १०,००० को ५ वटा Google Play गिफ्ट कार्ड किन्न आवश्यक छ।\n\nकिन्नुहोस् र मलाई कोडहरू तुरुन्त पठाउनुहोस्।\n\nयो अरू कसैसँग छलफल नगर्नुहोस्।\n\n— [तपाईंको CEO को नाम]',
        actions: [
          { label_en: '🛒 Buy Gift Cards', label_np: '🛒 गिफ्ट कार्ड किन्नुहोस्', correct: false },
          { label_en: '📞 Call CEO Directly', label_np: '📞 CEO लाई सोझै फोन', correct: true },
          { label_en: '🚫 Report to IT', label_np: '🚫 IT लाई रिपोर्ट', correct: true }
        ],
        feedback_correct_en: '✅ Excellent! This is a "CEO fraud" or "Business Email Compromise" scam. The email appears to come from your boss but is from a spoofed address. Always verify urgent financial requests through a separate communication channel.',
        feedback_correct_np: '✅ उत्कृष्ट! यो "CEO धोखाधडी" वा "व्यापार इमेल सम्झौता" स्क्याम हो। इमेल तपाईंको बसबाट आएको देखिन्छ तर नक्कली ठेगानाबाट हो। तत्काल वित्तीय अनुरोधहरू सधैं छुट्टै सञ्चार च्यानल मार्फत प्रमाणित गर्नुहोस्।',
        feedback_wrong_en: '❌ CEO fraud scam! The email is from a fake/spoofed address. Real CEOs don\'t ask employees to buy gift cards. The "don\'t discuss this" instruction is a tactic to prevent you from verifying. Always call your CEO directly.',
        feedback_wrong_np: '❌ CEO धोखाधडी स्क्याम! इमेल नक्कली/स्पूफ गरिएको ठेगानाबाट हो। वास्तविक CEO ले कर्मचारीलाई गिफ्ट कार्ड किन्न भन्दैनन्। "यो छलफल नगर्नुहोस्" निर्देशन प्रमाणित गर्नबाट रोक्ने चाल हो।'
      }
    ]
  };

  /* ─── State ─── */
  let currentAge = 'student';
  let currentIndex = 0;
  let currentScenarios = scenarios.student;
  let answered = false;

  /* ─── DOM ─── */
  const scamMessage = document.getElementById('scamMessage');
  const scamActions = document.getElementById('scamActions');
  const scamFeedback = document.getElementById('scamFeedbackInner');
  const scamNext = document.getElementById('scamNext');
  const scamCounter = document.getElementById('scamCounter');
  const ageTabs = document.querySelectorAll('.age-tab');

  /* ─── Utility: get current language ─── */
  function getLang() {
    return document.documentElement.getAttribute('data-lang') || 'en';
  }

  /* ─── Render Scenario ─── */
  function renderScenario() {
    answered = false;
    scamNext.style.display = 'none';
    const lang = getLang();
    const s = currentScenarios[currentIndex];

    // Message
    const body = lang === 'np' ? s.body_np : s.body_en;
    scamMessage.innerHTML = '<div class="msg-sender">' + s.sender + '</div>' +
      '<div class="msg-body">' + body.replace(/\n/g, '<br>').replace(/(https?:\/\/[^\s<]+|[\w.-]+\.(?:com|org|xyz|np)[^\s<]*)/g, '<span class="msg-link">$1</span>') + '</div>';

    // Actions
    scamActions.innerHTML = '';
    s.actions.forEach(function (action, idx) {
      var btn = document.createElement('button');
      btn.className = 'sim-action-btn';
      btn.textContent = lang === 'np' ? action.label_np : action.label_en;
      btn.addEventListener('click', function () { handleAction(idx); });
      scamActions.appendChild(btn);
    });

    // Reset feedback
    var placeholder = lang === 'np'
      ? '👆 सही निर्णय गर्नुभयो कि भनेर हेर्न कार्य छान्नुहोस्!'
      : '👆 Choose an action to see if you made the right call!';
    scamFeedback.innerHTML = '<p class="sim-feedback-placeholder">' + placeholder + '</p>';

    // Counter
    scamCounter.textContent = (currentIndex + 1) + ' / ' + currentScenarios.length;
  }

  /* ─── Handle Action Click ─── */
  function handleAction(idx) {
    if (answered) return;
    answered = true;

    const lang = getLang();
    const s = currentScenarios[currentIndex];
    const action = s.actions[idx];
    const isCorrect = action.correct;

    // Highlight buttons
    var btns = scamActions.querySelectorAll('.sim-action-btn');
    btns.forEach(function (btn, i) {
      if (i === idx) {
        btn.classList.add(isCorrect ? 'chosen-correct' : 'chosen-wrong');
      }
      // Show correct answers
      if (s.actions[i].correct && i !== idx) {
        btn.classList.add('chosen-correct');
      }
    });

    // Show feedback
    var feedbackText = isCorrect
      ? (lang === 'np' ? s.feedback_correct_np : s.feedback_correct_en)
      : (lang === 'np' ? s.feedback_wrong_np : s.feedback_wrong_en);

    scamFeedback.innerHTML = '<div class="feedback-result ' + (isCorrect ? 'feedback-correct' : 'feedback-wrong') + '">' +
      '<h4>' + (isCorrect ? (lang === 'np' ? '✅ सही निर्णय!' : '✅ Correct Decision!') : (lang === 'np' ? '❌ जोखिमपूर्ण विकल्प!' : '❌ Risky Choice!')) + '</h4>' +
      '<p>' + feedbackText + '</p></div>';

    // Reveal Next button
    scamNext.style.display = 'flex';

    // Update next button label for last scenario
    var isLast = currentIndex === currentScenarios.length - 1;
    var nextSpanEn = scamNext.querySelector('[data-lang-en]');
    var nextSpanNp = scamNext.querySelector('[data-lang-np]');
    if (nextSpanEn) nextSpanEn.textContent = isLast ? 'Start Over ↺' : 'Next Message →';
    if (nextSpanNp) nextSpanNp.textContent = isLast ? 'फेरि सुरु ↺' : 'अर्को सन्देश →';
  }

  /* ─── Next Scenario ─── */
  scamNext.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % currentScenarios.length;
    renderScenario();
  });

  /* ─── Age Tab Switch ─── */
  ageTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      ageTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      currentAge = tab.getAttribute('data-age');
      currentScenarios = scenarios[currentAge];
      currentIndex = 0;
      renderScenario();
    });
  });

  /* ─── Initialize ─── */
  renderScenario();

  /* ─── Expose re-render for language switch ─── */
  window.rerenderScamSimulator = renderScenario;

})();
