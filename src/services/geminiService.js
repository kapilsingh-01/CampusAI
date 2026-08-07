export async function askGemini(prompt) {

    try {

        const response = await fetch("http://localhost:5000/api/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({

                message: prompt

            }),

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.error || "Server Error");

        }

        return data.reply;

    }

    catch (error) {

        console.error(error);

        if (error.name === "TypeError") {

            throw new Error("🔴 CampusAI server is offline.");

        }

        throw new Error(error.message || "Something went wrong.");

    }

}




export async function askPDF(prompt) {

    try {

        const response = await fetch("http://localhost:5000/api/pdf-chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message: prompt

            })

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.error || "Server Error");

        }

        return data.reply;

    }

    catch (error) {

        console.error(error);

        if (error.name === "TypeError") {

            throw new Error("🔴 CampusAI server is offline.");

        }

        throw new Error(error.message || "Something went wrong.");

    }

}