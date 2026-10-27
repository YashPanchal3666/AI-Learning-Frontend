
 // AI Tutor Service for AILearn Platform
// Gemini requests are handled securely by the backend.

const API_BASE_URL = "https://ai-learning-backend-o3m1.onrender.com/api";

// Fetch registration data from the backend.
// Local storage is only a fallback, not guaranteed to contain every user.
export async function getLiveRegistrationStats() {
    let usersList = [];

    try {
        const response = await fetch(`${API_BASE_URL}/users`);

        if (response.ok) {
            const json = await response.json();

            if (Array.isArray(json)) {
                usersList = json;
            } else if (Array.isArray(json.data)) {
                usersList = json.data;
            }
        }
    } catch (error) {
        console.error("Could not fetch live users:", error);
    }

    if (usersList.length === 0) {
        try {
            const localUsers = JSON.parse(
                localStorage.getItem("users") || "[]"
            );

            if (Array.isArray(localUsers)) {
                usersList = localUsers;
            }
        } catch (error) {
            console.error("Could not read local users:", error);
        }
    }

    const now = new Date();
    const todayStr = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let todayCount = 0;
    let thisMonthCount = 0;
    const todayNames = [];
    const thisMonthNames = [];

    usersList.forEach((user) => {
        const rawDate = user.createdAt || user.joined || user.date;

        if (!rawDate) return;

        const date = new Date(rawDate);

        if (Number.isNaN(date.getTime())) return;

        const dateStr = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");

        if (dateStr === todayStr) {
            todayCount++;
            if (user.name) todayNames.push(user.name);
        }

        if (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        ) {
            thisMonthCount++;
            if (user.name) thisMonthNames.push(user.name);
        }
    });

    return {
        todayCount,
        thisMonthCount,
        totalUsers: usersList.length,
        todayNames,
        thisMonthNames,
        monthName: now.toLocaleString("en-US", { month: "long" }),
        currentYear,
        dateString: now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    };
}

const BASE_SYSTEM_INSTRUCTION = `
You are AILearn AI Tutor, a helpful and friendly AI mentor for the
AILearn Online Learning Platform.

Help students with learning, course recommendations, programming,
platform features, and navigating AILearn.

Rules:
1. Respond in English only.
2. Never invent registration counts or claim that unverified data is live.
3. Never direct regular students to the /admin route.
4. Keep answers clear, polite, and well structured.
5. Use Markdown formatting when helpful.
`;

function getFallbackResponse(userMessage, stats = null) {
    const lower = String(userMessage || "").toLowerCase();

    const isRegistrationQuery =
        lower.includes("register") ||
        lower.includes("registered") ||
        lower.includes("registration") ||
        lower.includes("user") ||
        lower.includes("users") ||
        lower.includes("student count");

    const asksForCount =
        lower.includes("how many") ||
        lower.includes("count") ||
        lower.includes("today") ||
        lower.includes("month") ||
        lower.includes("new") ||
        lower.includes("total");

    if (isRegistrationQuery && asksForCount) {
        if (!stats) {
            return "I could not retrieve the registration statistics right now. Please try again shortly.";
        }

        return (
            "Here are the registration details available to me:\n\n" +
            `• **Registered Today:** ${stats.todayCount}\n` +
            `• **Registered This Month (${stats.monthName}):** ${stats.thisMonthCount}\n` +
            `• **Total Users Returned by the User API:** ${stats.totalUsers}\n\n` +
            "These figures depend on the user data returned by the backend."
        );
    }

    if (
        lower.includes("course") ||
        lower.includes("catalog") ||
        lower.includes("subject")
    ) {
        return (
            "📚 **AILearn Course Categories**\n\n" +
            "1. **AI Tools:** ChatGPT, prompt engineering, LangChain and LLMs.\n" +
            "2. **Technology:** Python, machine learning, full-stack development and data science.\n" +
            "3. **Languages:** English and other language learning.\n" +
            "4. **Communication:** Public speaking, leadership and negotiation.\n\n" +
            "Ask me about a topic to explore it further."
        );
    }

    if (
        lower.includes("price") ||
        lower.includes("cost") ||
        lower.includes("fee") ||
        lower.includes("free")
    ) {
        return (
            "💰 **AILearn Pricing**\n\n" +
            "Please check the current course or subscription page for confirmed prices. " +
            "I do not want to provide outdated pricing information."
        );
    }

    if (
        lower.includes("certificate") ||
        lower.includes("verify") ||
        lower.includes("cert")
    ) {
        return (
            "🎓 **Course Certificates**\n\n" +
            "Check the course completion requirements in AILearn. " +
            "Certificate eligibility depends on the requirements configured for that course."
        );
    }

    if (
        lower.includes("support") ||
        lower.includes("help") ||
        lower.includes("problem") ||
        lower.includes("issue")
    ) {
        return (
            "📩 **AILearn Support**\n\n" +
            "1. Visit **/contact** to submit a support request.\n" +
            "2. Check **/dashboard** for your learning activity.\n" +
            "3. Visit **/community** to discuss learning questions."
        );
    }

    if (
        lower.includes("login") ||
        lower.includes("signup") ||
        lower.includes("register") ||
        lower.includes("account")
    ) {
        return (
            "🔐 **Account Help**\n\n" +
            "Create an account at **/register** or sign in at **/login**."
        );
    }

    if (
        lower.includes("python") ||
        lower.includes("llm") ||
        lower.includes("gpt") ||
        lower.includes("prompt")
    ) {
        return (
            "🤖 **AI Learning Recommendations**\n\n" +
            "• Python for AI and machine learning.\n" +
            "• Generative AI and prompt engineering.\n" +
            "• Large language models (LLMs).\n\n" +
            "Tell me your current skill level and I can suggest a learning path."
        );
    }

    return (
        "👋 Hello! I am your **AILearn AI Tutor**.\n\n" +
        "You can ask me about:\n" +
        "• AI, Python and programming\n" +
        "• Courses and learning recommendations\n" +
        "• Registration statistics\n" +
        "• Certificates and platform features\n\n" +
        "How can I help you today?"
    );
}

export async function askAiTutor(userMessage) {
    const message = String(userMessage || "").trim();

    if (!message) {
        return "Please enter a question so I can help you.";
    }

    let stats = null;

    try {
        stats = await getLiveRegistrationStats();
    } catch (error) {
        console.error("Registration statistics unavailable:", error);
    }

    const lower = message.toLowerCase();

    const isRegistrationQuery =
        (
            lower.includes("register") ||
            lower.includes("registration") ||
            lower.includes("registered") ||
            lower.includes("user") ||
            lower.includes("student") ||
            lower.includes("enroll")
        ) &&
        (
            lower.includes("today") ||
            lower.includes("month") ||
            lower.includes("how many") ||
            lower.includes("new") ||
            lower.includes("total") ||
            lower.includes("count")
        );

    // Preserve the existing direct response for registration questions.
    if (isRegistrationQuery) {
        return getFallbackResponse(message, stats);
    }

    const liveContext = stats
        ? [
            `Registered today (${stats.dateString}): ${stats.todayCount}`,
            `Registered this month (${stats.monthName} ${stats.currentYear}): ${stats.thisMonthCount}`,
            `Total users returned by the user API: ${stats.totalUsers}`
        ].join("\n")
        : "Registration statistics could not be retrieved.";

    try {
        // The backend holds the Gemini API key.
        const response = await fetch(`${API_BASE_URL}/ai-tutor/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message,
                liveContext,
                systemInstruction: BASE_SYSTEM_INSTRUCTION
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("AI Tutor backend error:", data);
            return getFallbackResponse(message, stats);
        }

        if (typeof data.answer === "string" && data.answer.trim()) {
            return data.answer;
        }

        return getFallbackResponse(message, stats);
    } catch (error) {
        console.error("AI Tutor request failed:", error);
        return getFallbackResponse(message, stats);
    }
}
