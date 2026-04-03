const INIT_ADMINS = [
    { email: "admin.hyd@local.com", password: "Admin@123", regNo: "HYD001", city: "Hyderabad", role: "admin", name: "Admin Hyderabad" },
    { email: "admin.blr@local.com", password: "Admin@123", regNo: "BLR001", city: "Bangalore", role: "admin", name: "Admin Bangalore" },
    { email: "admin.che@local.com", password: "Admin@123", regNo: "CHE001", city: "Chennai", role: "admin", name: "Admin Chennai" },
    { email: "admin.mum@local.com", password: "Admin@123", regNo: "MUM001", city: "Mumbai", role: "admin", name: "Admin Mumbai" },
    { email: "admin.del@local.com", password: "Admin@123", regNo: "DEL001", city: "Delhi", role: "admin", name: "Admin Delhi" }
];

const CITIES = ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi"];

const i18nDict = {
    en: {
        "app_title": "🌿 Clean City",
        "app_subtitle": "Smart Waste Management System",
        "tab_user": "User",
        "tab_admin": "Admin",
        "tab_collector": "Collector",
        "login_btn": "Login",
        "signup_btn": "Sign Up",
        "logout_btn": "Logout",
        "settings_btn": "⚙️ Settings",
        "admin_portal": "🌿 Admin Portal",
        "admin_complaints": "📋 View Complaints",
        "admin_reg_col": "➕ Register Collector",
        "admin_man_col": "🚛 Manage Collectors",
        "admin_leave": "📅 Leave Management",
        "col_portal": "🚛 Collector Portal",
        "col_tasks": "📋 My Tasks",
        "col_performance": "📈 Performance",
        "col_calendar": "📅 Attendance",
        "col_leave": "📝 Apply Leave",
        "user_portal": "👤 User Portal",
        "user_new_comp": "➕ New Complaint",
        "user_my_comp": "📋 My Complaints",
        
        // Exact String Keys
        "🌿 Clean City": "🌿 Clean City",
        "Smart Waste Management System": "Smart Waste Management System",
        "User": "User",
        "Admin": "Admin",
        "Collector": "Collector",
        "Email Address": "Email Address",
        "Password": "Password",
        "Login": "Login",
        "Don't have an account?": "Don't have an account?",
        "Sign up": "Sign up",
        "Full Name": "Full Name",
        "City": "City",
        "Select City": "Select City",
        "Create password": "Create password",
        "Confirm Password": "Confirm Password",
        "Confirm password": "Confirm password",
        "Sign Up": "Sign Up",
        "Already have an account?": "Already have an account?",
        "Admin Email": "Admin Email",
        "Registration Number (RegNo)": "Registration Number (RegNo)",
        "Admin Login": "Admin Login",
        "Unique Code": "Unique Code",
        "Collector Login": "Collector Login",
        "Report Waste": "Report Waste",
        "Track & Review": "Track & Review",
        "My Profile": "My Profile",
        "User Portal": "User Portal",
        "Settings": "Settings",
        "⚙️ Settings": "⚙️ Settings",
        "Logout": "Logout",
        "Location Area": "Location Area",
        "Description": "Description",
        "Briefly describe the waste...": "Briefly describe the waste...",
        "📸 Live Camera Capture": "📸 Live Camera Capture",
        "Open Camera": "Open Camera",
        "Take Photo": "Take Photo",
        "Retake": "Retake",
        "Submit Report": "Submit Report",
        "My Complaints": "My Complaints",
        "Rate Collector": "Rate Collector",
        "How did they do? Your feedback is visible to them.": "How did they do? Your feedback is visible to them.",
        "Rating (1-5 ⭐)": "Rating (1-5 ⭐)",
        "⭐⭐⭐⭐⭐ Excellent": "⭐⭐⭐⭐⭐ Excellent",
        "⭐⭐⭐⭐ Good": "⭐⭐⭐⭐ Good",
        "⭐⭐⭐ Average": "⭐⭐⭐ Average",
        "⭐⭐ Poor": "⭐⭐ Poor",
        "⭐ Very Bad": "⭐ Very Bad",
        "Comment / Feedback": "Comment / Feedback",
        "Write your review...": "Write your review...",
        "Submit Review": "Submit Review",
        "Cancel": "Cancel",
        "Live Tracking (Simulation)": "Live Tracking (Simulation)",
        "Assigned": "Assigned",
        "In Progress": "In Progress",
        "Completed": "Completed",
        "Pending": "Pending",
        "Available": "Available",
        "Busy": "Busy",
        "Offline": "Offline",
        "On Leave": "On Leave",
        "User Settings": "User Settings",
        "Change Email": "Change Email",
        "Change Password": "Change Password",
        "Language": "Language",
        "Theme": "Theme",
        "Dark Mode": "Dark Mode",
        "Save Settings": "Save Settings",
        "Admin Portal": "Admin Portal",
        "View Complaints": "View Complaints",
        "Register Collector": "Register Collector",
        "Manage Collectors": "Manage Collectors",
        "Leave Management": "Leave Management",
        "Admin Dashboard": "Admin Dashboard",
        "City Complaints": "City Complaints",
        "Image": "Image",
        "Location": "Location",
        "Status": "Status",
        "Action": "Action",
        "Register New Collector": "Register New Collector",
        "Name": "Name",
        "Email": "Email",
        "Phone Number": "Phone Number",
        "Shift Start Time": "Shift Start Time",
        "Shift End Time": "Shift End Time",
        "Create Collector": "Create Collector",
        "Collectors in": "Collectors in",
        "Timings": "Timings",
        "Collector Performance:": "Collector Performance:",
        "Total Jobs Completed": "Total Jobs Completed",
        "Average Rating": "Average Rating",
        "Completed Jobs & Reviews": "Completed Jobs & Reviews",
        "Back to Collectors": "Back to Collectors",
        "Collector Code": "Collector Code",
        "Date": "Date",
        "Reason": "Reason",
        "Edit Collector": "Edit Collector",
        "Save Changes": "Save Changes",
        "Assign Task:": "Assign Task:",
        "Available Collectors": "Available Collectors",
        "Estimated Completion Time": "Estimated Completion Time",
        "Select Collector": "Select Collector",
        "Assign & Dispatch": "Assign & Dispatch",
        "My Tasks": "My Tasks",
        "Performance": "Performance",
        "Attendance": "Attendance",
        "Apply Leave": "Apply Leave",
        "Collector Dashboard": "Collector Dashboard"
    },
    te: {
        "app_title": "🌿 స్వచ్ఛ నగరం",
        "app_subtitle": "స్మార్ట్ వేస్ట్ మేనేజ్‌మెంట్ సిస్టమ్",
        "tab_user": "వాడుకరి",
        "tab_admin": "అడ్మిన్",
        "tab_collector": "సేకరించేవారు",
        "login_btn": "లాగిన్",
        "signup_btn": "సైనప్",
        "logout_btn": "లాగౌట్",
        "settings_btn": "⚙️ సెట్టింగ్‌లు",
        "admin_portal": "🌿 అడ్మిన్ పోర్టల్",
        "admin_complaints": "📋 ఫిర్యాదులు",
        "admin_reg_col": "➕ సేకరించేవారిని నమోదు చేయండి",
        "admin_man_col": "🚛 సేకరించేవారిని నిర్వహించండి",
        "admin_leave": "📅 సెలవు నిర్వహణ",
        "col_portal": "🚛 సేకరించేవారి పోర్టల్",
        "col_tasks": "📋 నా పనులు",
        "col_performance": "📈 పనితీరు",
        "col_calendar": "📅 హాజరు",
        "col_leave": "📝 సెలవు దరఖాస్తు",
        "user_portal": "👤 వాడుకరి పోర్టల్",
        "user_new_comp": "➕ కొత్త ఫిర్యాదు",
        "user_my_comp": "📋 నా ఫిర్యాదులు",
        
        "🌿 Clean City": "🌿 స్వచ్ఛ నగరం",
        "Smart Waste Management System": "స్మార్ట్ వేస్ట్ మేనేజ్‌మెంట్ సిస్టమ్",
        "User": "వాడుకరి",
        "Admin": "అడ్మిన్",
        "Collector": "సేకరించేవారు",
        "Email Address": "ఈమెయిల్ చిరునామా",
        "Password": "పాస్‌వర్డ్",
        "Login": "లాగిన్",
        "Don't have an account?": "ఖాతా లేదా?",
        "Sign up": "సైనప్",
        "Full Name": "పూర్తి పేరు",
        "City": "నగరం",
        "Select City": "నగరాన్ని ఎంచుకోండి",
        "Create password": "పాస్‌వర్డ్ సృష్టించండి",
        "Confirm Password": "పాస్‌వర్డ్‌ను నిర్ధారించండి",
        "Confirm password": "పాస్‌వర్డ్‌ను నిర్ధారించండి",
        "Sign Up": "సైనప్",
        "Already have an account?": "ఇప్పటికే ఖాతా ఉందా?",
        "Admin Email": "అడ్మిన్ ఈమెయిల్",
        "Registration Number (RegNo)": "రిజిస్ట్రేషన్ సంఖ్య (RegNo)",
        "Admin Login": "అడ్మిన్ లాగిన్",
        "Unique Code": "ప్రత్యేక కోడ్",
        "Collector Login": "సేకరించేవారి లాగిన్",
        "Report Waste": "చెత్తను నివేదించండి",
        "Track & Review": "ట్రాక్ & రివ్యూ",
        "My Profile": "నా ప్రొఫైల్",
        "User Portal": "వాడుకరి పోర్టల్",
        "Settings": "సెట్టింగ్‌లు",
        "⚙️ Settings": "⚙️ సెట్టింగ్‌లు",
        "Logout": "లాగౌట్",
        "Location Area": "స్థల ప్రాంతం",
        "Description": "వివరణ",
        "Briefly describe the waste...": "చెత్త గురించి క్లుప్తంగా వివరించండి...",
        "📸 Live Camera Capture": "📸 లైవ్ కెమెరా చిత్రం",
        "Open Camera": "కెమెరా తెరవండి",
        "Take Photo": "ఫోటో తీయండి",
        "Retake": "మళ్లీ తీయండి",
        "Submit Report": "నివేదిక సమర్పించండి",
        "My Complaints": "నా ఫిర్యాదులు",
        "Rate Collector": "సేకరించేవారికి రేటింగ్ ఇవ్వండి",
        "How did they do? Your feedback is visible to them.": "వారి పనితీరు ఎలా ఉంది? మీ అభిప్రాయం వారికి కనిపిస్తుంది.",
        "Rating (1-5 ⭐)": "రేటింగ్ (1-5 ⭐)",
        "⭐⭐⭐⭐⭐ Excellent": "⭐⭐⭐⭐⭐ అద్భుతం",
        "⭐⭐⭐⭐ Good": "⭐⭐⭐⭐ మంచిది",
        "⭐⭐⭐ Average": "⭐⭐⭐ పర్వాలేదు",
        "⭐⭐ Poor": "⭐⭐ బాగాలేదు",
        "⭐ Very Bad": "⭐ చాలా బాగాలేదు",
        "Comment / Feedback": "అభిప్రాయం / సూచన",
        "Write your review...": "మీ సమీక్షను రాయండి...",
        "Submit Review": "సమీక్ష సమర్పించండి",
        "Cancel": "రద్దు చేయి",
        "Live Tracking (Simulation)": "లైవ్ ట్రాకింగ్",
        "Assigned": "కేటాయించబడింది",
        "In Progress": "కొనసాగుతోంది",
        "Completed": "పూర్తయింది",
        "Pending": "పెండింగ్‌లో ఉంది",
        "Available": "అందుబాటులో ఉంది",
        "Busy": "బిజీగా ఉంది",
        "Offline": "ఆఫ్‌లైన్",
        "On Leave": "సెలవులో ఉన్నారు",
        "User Settings": "వాడుకరి సెట్టింగ్‌లు",
        "Change Email": "ఈమెయిల్ మార్చండి",
        "Change Password": "పాస్‌వర్డ్ మార్చండి",
        "Language": "భాష",
        "Theme": "థీమ్",
        "Dark Mode": "డార్క్ మోడ్",
        "Save Settings": "సెట్టింగ్‌లను సేవ్ చేయండి",
        "Admin Portal": "అడ్మిన్ పోర్టల్",
        "View Complaints": "ఫిర్యాదులు చూడండి",
        "Register Collector": "సేకరించేవారిని నమోదు చేయండి",
        "Manage Collectors": "సేకరించేవారిని నిర్వహించండి",
        "Leave Management": "సెలవు నిర్వహణ",
        "Admin Dashboard": "అడ్మిన్ డాష్‌బోర్డ్",
        "City Complaints": "నగర ఫిర్యాదులు",
        "Image": "చిత్రం",
        "Location": "స్థలం",
        "Status": "స్థితి",
        "Action": "చర్య",
        "Register New Collector": "కొత్త కలెక్టర్‌ని నమోదు చేయండి",
        "Name": "పేరు",
        "Email": "ఈమెయిల్",
        "Phone Number": "ఫోన్ నంబర్",
        "Shift Start Time": "షిఫ్ట్ ప్రారంభ సమయం",
        "Shift End Time": "షిఫ్ట్ ముగింపు సమయం",
        "Create Collector": "కలెక్టర్‌ని సృష్టించండి",
        "Collectors in": "కలెక్టర్లు",
        "Timings": "సమయాలు",
        "Collector Performance:": "కలెక్టర్ పనితీరు:",
        "Total Jobs Completed": "పూర్తయిన పనులు",
        "Average Rating": "సగటు రేటింగ్",
        "Completed Jobs & Reviews": "పూర్తయిన పనులు & సమీక్షలు",
        "Back to Collectors": "కలెక్టర్లకు తిరిగి వెళ్ళు",
        "Collector Code": "కలెక్టర్ కోడ్",
        "Date": "తేదీ",
        "Reason": "కారణం",
        "Edit Collector": "కలెక్టర్‌ని సవరించండి",
        "Save Changes": "మార్పులను సేవ్ చేయండి",
        "Assign Task:": "పని కేటాయించండి:",
        "Available Collectors": "అందుబాటులో ఉన్న కలెక్టర్లు",
        "Estimated Completion Time": "అంచనా అనుకోబడిన సమయం",
        "Select Collector": "కలెక్టర్‌ని ఎంచుకోండి",
        "Assign & Dispatch": "కేటాయించి పంపండి",
        "My Tasks": "నా పనులు",
        "Performance": "పనితీరు",
        "Attendance": "హాజరు",
        "Apply Leave": "సెలవు దరఖాస్తు",
        "Collector Dashboard": "కలెక్టర్ డాష్‌బోర్డ్"
    },
    hi: {
        "app_title": "🌿 स्वच्छ शहर",
        "app_subtitle": "स्मार्ट वेस्ट मैनेजमेंट सिस्टम",
        "tab_user": "उपयोगकर्ता",
        "tab_admin": "व्यवस्थापक",
        "tab_collector": "कलेक्टर",
        "login_btn": "लॉग इन",
        "signup_btn": "साइन अप",
        "logout_btn": "लॉग आउट",
        "settings_btn": "⚙️ सेटिंग्स",
        "admin_portal": "🌿 व्यवस्थापक पोर्टल",
        "admin_complaints": "📋 शिकायतें देखें",
        "admin_reg_col": "➕ कलेक्टर पंजीकृत करें",
        "admin_man_col": "🚛 कलेक्टर प्रबंधित करें",
        "admin_leave": "📅 छुट्टी प्रबंधन",
        "col_portal": "🚛 कलेक्टर पोर्टल",
        "col_tasks": "📋 मेरे कार्य",
        "col_performance": "📈 प्रदर्शन",
        "col_calendar": "📅 उपस्थिति",
        "col_leave": "📝 छुट्टी लागू करें",
        "user_portal": "👤 उपयोगकर्ता पोर्टल",
        "user_new_comp": "➕ नई शिकायत",
        "user_my_comp": "📋 मेरी शिकायतें",

        "🌿 Clean City": "🌿 स्वच्छ शहर",
        "Smart Waste Management System": "स्मार्ट वेस्ट मैनेजमेंट सिस्टम",
        "User": "उपयोगकर्ता",
        "Admin": "व्यवस्थापक",
        "Collector": "कलेक्टर",
        "Email Address": "ईमेल पता",
        "Password": "पासवर्ड",
        "Login": "लॉग इन",
        "Don't have an account?": "क्या आपके पास खाता नहीं है?",
        "Sign up": "साइन अप",
        "Full Name": "पूरा नाम",
        "City": "शहर",
        "Select City": "शहर चुनें",
        "Create password": "पासवर्ड बनाएं",
        "Confirm Password": "पासवर्ड की पुष्टि करें",
        "Confirm password": "पासवर्ड की पुष्टि करें",
        "Sign Up": "साइन अप",
        "Already have an account?": "क्या आपके पास पहले से खाता है?",
        "Admin Email": "व्यवस्थापक ईमेल",
        "Registration Number (RegNo)": "पंजीकरण संख्या (RegNo)",
        "Admin Login": "व्यवस्थापक लॉगिन",
        "Unique Code": "अद्वितीय कोड",
        "Collector Login": "कलेक्टर लॉगिन",
        "Report Waste": "कचरा रिपोर्ट करें",
        "Track & Review": "ट्रैक और समीक्षा",
        "My Profile": "मेरी प्रोफ़ाइल",
        "User Portal": "उपयोगकर्ता पोर्टल",
        "Settings": "सेटिंग्स",
        "⚙️ Settings": "⚙️ सेटिंग्स",
        "Logout": "लॉग आउट",
        "Location Area": "स्थान क्षेत्र",
        "Description": "विवरण",
        "Briefly describe the waste...": "कचरे का संक्षेप में वर्णन करें...",
        "📸 Live Camera Capture": "📸 लाइव कैमरा कैप्चर",
        "Open Camera": "कैमरा खोलें",
        "Take Photo": "फोटो लें",
        "Retake": "फिर से लें",
        "Submit Report": "रिपोर्ट सबमिट करें",
        "My Complaints": "मेरी शिकायतें",
        "Rate Collector": "कलेक्टर को रेट करें",
        "How did they do? Your feedback is visible to them.": "उन्होंने कैसा काम किया? आपकी प्रतिक्रिया उन्हें दिखाई देगी।",
        "Rating (1-5 ⭐)": "रेटिंग (1-5 ⭐)",
        "⭐⭐⭐⭐⭐ Excellent": "⭐⭐⭐⭐⭐ बहुत बढ़िया",
        "⭐⭐⭐⭐ Good": "⭐⭐⭐⭐ अच्छा",
        "⭐⭐⭐ Average": "⭐⭐⭐ औसत",
        "⭐⭐ Poor": "⭐⭐ खराब",
        "⭐ Very Bad": "⭐ बहुत खराब",
        "Comment / Feedback": "टिप्पणी / प्रतिक्रिया",
        "Write your review...": "अपनी समीक्षा लिखें...",
        "Submit Review": "समीक्षा सबमिट करें",
        "Cancel": "रद्द करें",
        "Live Tracking (Simulation)": "लाइव ट्रैकिंग",
        "Assigned": "सौंपा गया",
        "In Progress": "प्रगति पर",
        "Completed": "पूरा हुआ",
        "Pending": "लंबित",
        "Available": "उपलब्ध",
        "Busy": "व्यस्त",
        "Offline": "ऑफ़लाइन",
        "On Leave": "छुट्टी पर",
        "User Settings": "उपयोगकर्ता सेटिंग्स",
        "Change Email": "ईमेल बदलें",
        "Change Password": "पासवर्ड बदलें",
        "Language": "भाषा",
        "Theme": "थीम",
        "Dark Mode": "डार्क मोड",
        "Save Settings": "सेटिंग्स सहेजें",
        "Admin Portal": "व्यवस्थापक पोर्टल",
        "View Complaints": "शिकायतें देखें",
        "Register Collector": "कलेक्टर पंजीकृत करें",
        "Manage Collectors": "कलेक्टर प्रबंधित करें",
        "Leave Management": "छुट्टी प्रबंधन",
        "Admin Dashboard": "व्यवस्थापक डैशबोर्ड",
        "City Complaints": "शहर की शिकायतें",
        "Image": "छवि",
        "Location": "स्थान",
        "Status": "स्थिति",
        "Action": "कार्रवाई",
        "Register New Collector": "नया कलेक्टर पंजीकृत करें",
        "Name": "नाम",
        "Email": "ईमेल",
        "Phone Number": "फ़ोन नंबर",
        "Shift Start Time": "शिफ्ट शुरू होने का समय",
        "Shift End Time": "शिफ्ट समाप्त होने का समय",
        "Create Collector": "कलेक्टर बनाएं",
        "Collectors in": "कलेक्टर",
        "Timings": "समय",
        "Collector Performance:": "कलेक्टर प्रदर्शन:",
        "Total Jobs Completed": "कुल पूरे किए गए कार्य",
        "Average Rating": "औसत रेटिंग",
        "Completed Jobs & Reviews": "पूरे किए गए कार्य और समीक्षाएं",
        "Back to Collectors": "कलेक्टर पर वापस जाएं",
        "Collector Code": "कलेक्टर कोड",
        "Date": "तारीख",
        "Reason": "कारण",
        "Edit Collector": "कलेक्टर संपादित करें",
        "Save Changes": "परिवर्तन सहेजें",
        "Assign Task:": "कार्य सौंपें:",
        "Available Collectors": "उपलब्ध कलेक्टर",
        "Estimated Completion Time": "अनुमानित समाप्ति समय",
        "Select Collector": "कलेक्टर चुनें",
        "Assign & Dispatch": "सौंपें और भेजें",
        "My Tasks": "मेरे कार्य",
        "Performance": "प्रदर्शन",
        "Attendance": "उपस्थिति",
        "Apply Leave": "छुट्टी लागू करें",
        "Collector Dashboard": "कलेक्टर डैशबोर्ड"
    }
};

let observerActive = false;

window.applyTranslation = function() {
    const lang = localStorage.getItem('language') || 'en';
    const dict = i18nDict[lang] || i18nDict['en'];

    function translateNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node._originalNodeValue === undefined) {
                node._originalNodeValue = node.nodeValue;
            }
            
            const trimmedOriginal = node._originalNodeValue.trim();
            if (trimmedOriginal && dict[trimmedOriginal]) {
                const translated = dict[trimmedOriginal];
                node.nodeValue = node._originalNodeValue.replace(trimmedOriginal, translated);
            } else if (trimmedOriginal && i18nDict['en'][trimmedOriginal]) {
                node.nodeValue = node._originalNodeValue.replace(trimmedOriginal, trimmedOriginal);
            } else {
                node.nodeValue = node._originalNodeValue;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

            if (node.placeholder) {
                if (!node._originalPlaceholder) {
                    node._originalPlaceholder = node.placeholder.trim();
                }
                const pOrig = node._originalPlaceholder;
                if (pOrig && dict[pOrig]) {
                    node.placeholder = dict[pOrig];
                } else if (pOrig && i18nDict['en'][pOrig]) {
                    node.placeholder = pOrig;
                }
            }

            const key = node.getAttribute('data-i18n');
            if (key) {
                if (node._originalDataI18n === undefined) {
                    node._originalDataI18n = node.textContent;
                }
                if (dict[key]) {
                    node.textContent = dict[key];
                } else if (i18nDict['en'][key]) {
                    node.textContent = i18nDict['en'][key];
                }
            }

            node.childNodes.forEach(translateNode);
        }
    }

    // Stop observer temporarily to prevent infinite loop while replacing text
    if (i18nObserver && observerActive) {
        i18nObserver.disconnect();
        observerActive = false;
    }

    translateNode(document.body);

    // Restart observer
    if (i18nObserver && !observerActive) {
        i18nObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
        observerActive = true;
    }
};

const i18nObserver = new MutationObserver((mutations) => {
    let shouldTranslate = false;
    for (let mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldTranslate = true;
            break;
        } else if (mutation.type === 'characterData') {
            shouldTranslate = true;
            break;
        }
    }
    
    if (shouldTranslate) {
        applyTranslation();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    observerActive = true;
    i18nObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
});

function initDB() {
    if (!localStorage.getItem('admins')) localStorage.setItem('admins', JSON.stringify(INIT_ADMINS));
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
    if (!localStorage.getItem('collectors')) localStorage.setItem('collectors', JSON.stringify([]));
    if (!localStorage.getItem('complaints')) localStorage.setItem('complaints', JSON.stringify([]));
    if (!localStorage.getItem('feedback')) localStorage.setItem('feedback', JSON.stringify([]));
    if (!localStorage.getItem('leaveRequests')) localStorage.setItem('leaveRequests', JSON.stringify([]));
    if (!localStorage.getItem('language')) localStorage.setItem('language', 'en');
}

// Theme Logic
function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', theme);
}
applyTheme(localStorage.getItem('theme') || 'light');

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function openSettings() {
    document.getElementById('global-settings-modal').style.display = 'flex';
    const user = getCurrentUser();
    if (user) {
        document.getElementById('set-email').value = user.email || '';
    }
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.getElementById('theme-toggle-switch').checked = (currentTheme === 'dark');
    document.getElementById('lang-select').value = localStorage.getItem('language') || 'en';
}

function closeSettings() {
    document.getElementById('global-settings-modal').style.display = 'none';
}

function handleSaveSettings(e) {
    e.preventDefault();
    const newEmail = document.getElementById('set-email').value;
    const newPwd = document.getElementById('set-pwd').value;
    const confirmPwd = document.getElementById('set-confirm-pwd').value;
    
    if (newPwd && newPwd !== confirmPwd) return alert("Passwords do not match!");
    
    localStorage.setItem('language', document.getElementById('lang-select').value);
    applyTranslation();
    const themeCheckbox = document.getElementById('theme-toggle-switch');
    applyTheme(themeCheckbox.checked ? 'dark' : 'light');
    
    let user = getCurrentUser();
    if (user && (newEmail !== user.email || newPwd)) {
        let users = getDB('users');
        let admins = getDB('admins');
        let collectors = getDB('collectors');
        
        let found = false;
        [users, admins, collectors].forEach(arr => {
            const idx = arr.findIndex(u => u.email === user.email);
            if (idx !== -1) {
                if (newEmail) arr[idx].email = newEmail;
                if (newPwd) arr[idx].password = newPwd;
                found = true;
                user = arr[idx];
            }
        });
        
        if (found) {
            setDB('users', users);
            setDB('admins', admins);
            setDB('collectors', collectors);
            setCurrentUser(user);
        }
    }
    
    showToast("Settings saved successfully!");
    closeSettings();
    if (user) {
        const userNameEl = document.getElementById('topbar-username');
        if (userNameEl) userNameEl.textContent = user.name || user.email;
    }
}

function getDB(key) { return JSON.parse(localStorage.getItem(key)) || []; }
function setDB(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function getCurrentUser() { return JSON.parse(localStorage.getItem('currentUser')); }
function setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); }
function logout() { localStorage.removeItem('currentUser'); window.location.href = 'index.html'; }

function checkAuth(role) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    if (role && user.role !== role) {
        if (user.role === 'admin') window.location.href = 'admin.html';
        else if (user.role === 'collector') window.location.href = 'collector.html';
        else window.location.href = 'user.html';
        return null;
    }
    return user;
}

function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `✨ <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function generateId() { return Math.random().toString(36).substr(2, 9); }

// Camera Utility Functions
let currentStream = null;
async function startCamera(videoElementId) {
    const video = document.getElementById(videoElementId);
    try {
        currentStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = currentStream;
        await video.play();
        return true;
    } catch (err) {
        console.error("Camera error:", err);
        alert("Camera access denied or unavailable.");
        return false;
    }
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
}

function captureSnapshot(videoElementId) {
    const video = document.getElementById(videoElementId);
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/png'); // returns base64
}

// Format date elegantly
function formatDate(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

initDB();

document.addEventListener('DOMContentLoaded', () => {
    const userNameEl = document.getElementById('topbar-username');
    if (userNameEl) {
        const u = getCurrentUser();
        if (u) userNameEl.textContent = u.name || u.email;
    }
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', (e) => { e.preventDefault(); logout(); });

    document.querySelectorAll('.city-select').forEach(select => {
        if (select.children.length <= 1) {
            CITIES.forEach(city => {
                const opt = document.createElement('option');
                opt.value = city;
                opt.textContent = city;
                select.appendChild(opt);
            });
        }
    });

    applyTranslation();
    renderNotifications();
});

// --- Real-time Notification System ---
function getNotifications() {
    return JSON.parse(localStorage.getItem('notification_counts')) || {};
}

function saveNotifications(data) {
    localStorage.setItem('notification_counts', JSON.stringify(data));
}

function addNotification(key) {
    const notifs = getNotifications();
    if (!notifs[key]) notifs[key] = 0;
    notifs[key]++;
    saveNotifications(notifs);
    renderNotifications();
}

function clearNotification(key) {
    const notifs = getNotifications();
    if (notifs[key]) {
        notifs[key] = 0;
        saveNotifications(notifs);
        renderNotifications();
    }
}

function renderNotifications() {
    const notifs = getNotifications();
    const currentUser = getCurrentUser();
    
    // Safety check - ignore if no user
    if (!currentUser) return;

    // Reset all notification dots visually first
    document.querySelectorAll('.notification-dot').forEach(dot => {
        dot.style.display = 'none';
        dot.textContent = '0';
    });

    // Render for Admin
    if (currentUser.role === 'admin') {
        const adminComp = notifs['admin_complaints'] || 0;
        if (adminComp > 0) {
            const dot = document.getElementById('noti-admin-complaints');
            if (dot) { dot.style.display = 'inline-block'; dot.textContent = adminComp; }
        }

        const adminLeave = notifs['admin_leave'] || 0;
        if (adminLeave > 0) {
            const dot = document.getElementById('noti-admin-leave');
            if (dot) { dot.style.display = 'inline-block'; dot.textContent = adminLeave; }
        }
    }

    // Render for Collector
    if (currentUser.role === 'collector') {
        const colTasks = notifs[`collector_tasks_${currentUser.id}`] || 0;
        if (colTasks > 0) {
            const dot = document.getElementById('noti-col-tasks');
            if (dot) { dot.style.display = 'inline-block'; dot.textContent = colTasks; }
        }
    }

    // Render for User
    if (currentUser.role === 'user') {
        const userTrack = notifs[`user_track_${currentUser.id}`] || 0;
        if (userTrack > 0) {
            const dot = document.getElementById('noti-user-track');
            if (dot) { dot.style.display = 'inline-block'; dot.textContent = userTrack; }
        }
    }
}
