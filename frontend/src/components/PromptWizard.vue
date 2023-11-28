<template>
    <div
        class="primary">
        <v-card :loading="isLoading">
            <v-toolbar
                color="secondary"
                theme="dark"
            >
                <v-toolbar-title>
                    <span class="text-h6 b">프롬프트 추천</span>
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-container>
                    <v-row align="start">
                        <v-col cols="12">
                            <v-text-field
                                v-model=prompt
                                label="기사 제목 또는 주제를 입력해주세요"
                                variant="outlined"
                                hint="Example"
                                append-inner-icon="mdi-send"
                                type="text"
                                @click:append-inner="sendPrompt"
                                ></v-text-field>
                        </v-col>
                        <!-- <v-btn @click="init">init</v-btn> -->
                    </v-row>
                </v-container>
                <p style="white-space: pre-wrap;">{{ result }}</p>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import OpenAI from "openai";

export default {
    data() {
        return {
            prompt: "",
            isLoading: false,
            result: "",
            template: "Stable Diffusion is an AI art generation model similar to DALLE-3.\n\
Here are some prompts for generating art with Stable Diffusion. \n\
\n\
Example:\n\
\n\
- A ghostly apparition drifting through a haunted mansion's grand ballroom, illuminated by flickering candlelight. Eerie, ethereal, moody lighting. \n\
- portait of a homer simpson archer shooting arrow at forest monster, front game card, drark, marvel comics, dark, smooth\n\
- pirate, deep focus, fantasy, matte, sharp focus\n\
- red dead redemption 2, cinematic view, epic sky, detailed, low angle, high detail, warm lighting, volumetric, godrays, vivid, beautiful\n\
- a fantasy style portrait painting of rachel lane / alison brie hybrid in the style of francois boucher oil painting, rpg portrait\n\
- athena, greek goddess, claudia black, bronze greek armor, owl crown, d & d, fantasy, portrait, headshot, sharp focus\n\
- closeup portrait shot of a large strong female biomechanic woman in a scenic scifi environment, elegant, smooth, sharp focus, warframe\n\
- ultra realistic illustration of steve urkle as the hulk, elegant, smooth, sharp focus\n\
- portrait of beautiful happy young ana de armas, ethereal, realistic anime, clean lines, sharp lines, crisp lines, vibrant color scheme\n\
- A highly detailed and hyper realistic portrait of a gorgeous young ana de armas, lisa frank, butterflies, floral, sharp focus\n\
- lots of delicious tropical fruits with drops of moisture on table, floating colorful water, mysterious expression, in a modern and abstract setting, with bold and colorful abstract art, blurred background, bright lighting\n\
- 1girl, The most beautiful form of chaos, Fauvist design, Flowing colors, Vivid colors, dynamic angle, fantasy world\n\
- solo, sitting, close-up, girl in the hourglass, Sand is spilling out of the broken hourglass, flowing sand, huge hourglass art, hologram, particles, nebula, magic circle\n\
- geometric abstract background, 1girl, depth of field, zentangle, mandala, tangle, entangle, beautiful and aesthetic, dynamic angle, glowing skin, floating colorful sparkles the most beautiful form of chaos, elegant, a brutalist designed, vivid colours, romanticism\n\
\n\
The prompt should adhere to and include all of the following rules:\n\
\n\
- Prompt should always be written in English, regardless of the input language. Please provide the prompts in English.\n\
- Each prompt should consist of a description of the scene followed by modifiers divided by commas.\n\
- When generating descriptions, focus on portraying the visual elements rather than delving into abstract psychological and emotional aspects. Provide clear and concise details that vividly depict the scene and its composition, capturing the tangible elements that make up the setting.\n\
- The modifiers should alter the mood, style, lighting, and other aspects of the scene.\n\
- Multiple modifiers can be used to provide more specific details.\n\
- After providing the prompt in English, also provide the Korean translation for each prompt.\n\
\n\
From now on, I will give you news headlines. \n\
Please write down a detailed list of prompts for creating images worthy of this news, following the rules at least 5 times each time."
        }
    },
    methods: {
        async init() {
            this.isLoading = true;
            this.openai = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true})
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: this.template }]
            });
            this.isLoading = false;
            console.log(response);  
        },
        async sendPrompt () {
            if (this.isLoading) return;

            this.isLoading = true;
            var openai = new OpenAI({apiKey: "", dangerouslyAllowBrowser: true})
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: this.template }, { role: "user", content: this.prompt }]
            });
            this.isLoading = false;
            this.result = response.choices[0].message.content;
        }
    }
}
</script>