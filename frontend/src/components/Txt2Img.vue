<template>
    <v-container fluid class="primary h-screen">
        <v-row class="fill-height">
            <v-col cols="7" class="left">
                <v-row :justify="start">
                    <v-col>
                        <v-img 
                            :width="120"
                            :height="45"
                            :src="require('@/assets/logo1.png')"
                            style="margin: 8px;"
                        ></v-img>
                    </v-col>
                </v-row>
                <p class="subtitle" style="margin-top: 24px; margin-bottom: 24px;">AI 이미지 생성기</p>
                <v-row>
                    <v-col cols="6">
                        <v-row 
                            style="margin-bottom: 12px;"
                            align-self="start"
                            no-gutters>
                            <v-col cols="1">
                                <v-img
                                    :max-width="30"
                                    :max-height="30"
                                    :aspect-ratio="1"
                                    :src="require('@/assets/Group 93.svg')"/>
                            </v-col>
                            <v-col cols="8" align-self="center">
                                <p>프롬프트</p>
                            </v-col>
                            <v-col cols="3" align-self="center">
                                <v-btn @click="promptWizard = true" :max-height="30" color="cyan">프롬프트 추천</v-btn>
                            </v-col>
                        </v-row>
                        <v-textarea
                            v-model="parameters.prompt"
                            label="추출하고자 하는 이미지의 키워드를 입력해 주세요."
                            clearable
                            no-resize
                            clear-icon="mdi-close-circle"
                            variant="solo"
                            ></v-textarea>
                    </v-col>
                    <v-col cols="6">
                        <v-row
                            style="margin-bottom: 12px;"
                            align-self="start"
                            no-gutters>
                            <v-img 
                                :max-width="30"
                                :max-height="30"
                                :aspect-ratio="1"
                                :src="require('@/assets/Group 93.svg')"/>
                                <p style="align-self: center; margin-left: 8px;">네거티브 프롬프트</p>
                        </v-row>
                        <v-textarea
                            v-model="parameters.negative_prompt"
                            label="추출하고자 하는 이미지의 배제되었으면 키워드를 입력해 주세요."
                            clearable
                            no-resize
                            clear-icon="mdi-close-circle"
                            variant="solo"
                            ></v-textarea>
                    </v-col>
                </v-row>
                <v-row
                    align-self="start"
                    align="center"
                    no-gutters>
                    <v-img 
                        :max-width="30"
                        :max-height="30"
                        :aspect-ratio="1"
                        :src="require('@/assets/Group 95.svg')"
                        style="margin: 8px;"
                    ></v-img>
                    <p class="subtitle">옵션</p>
                </v-row>
                <v-container class="options">
                    <v-row>
                        <v-col cols="6">
                            <v-row class="option-item">
                                <v-col cols="9" align-self="center">
                                    <p class="label-data">이미지 크기 - 가로 (권장 1024)</p>
                                </v-col>
                                <v-col cols="3" class="float-right">
                                    <v-text-field
                                        class="tf-data"
                                        v-model="parameters.width"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        single-line
                                        :step="256"
                                        :min="256"
                                        :max="2048"
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-slider
                                class="option-slider"
                                v-model="parameters.width"
                                :max="2048"
                                :min="256"
                                :step="256"
                                >
                            </v-slider>
                        </v-col>
                        <v-col cols="6">
                            <v-row class="option-item">
                                <v-col cols="9" align-self="center">
                                    <p class="label-data">이미지 개수</p>
                                </v-col>
                                <v-col cols="3" class="float-right">
                                    <v-text-field
                                        class="tf-data"
                                        v-model="parameters.n_iter"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        single-line
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-slider
                                class="option-slider"
                                v-model="parameters.n_iter"
                                :max="8"
                                :min="1"
                                :step="1"
                                >
                            </v-slider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row class="option-item">
                                <v-col cols="9" align-self="center">
                                    <p class="label-data">이미지 크기 - 세로 (권장 1024)</p>
                                </v-col>
                                <v-col cols="3" class="float-right">
                                    <v-text-field
                                        class="tf-data"
                                        v-model="parameters.height"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        single-line
                                        :max="2048"
                                        :min="256"
                                        :step="256"
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-slider
                                class="option-slider"
                                v-model="parameters.height"
                                :max="2048"
                                :min="256"
                                :step="256"
                                >
                            </v-slider>
                        </v-col>
                        <v-col cols="6">
                            <v-row class="option-item">
                                <v-col cols="9" align-self="center">
                                    <p class="label-data">샘플링 단계 (권장 20~40)</p>
                                </v-col>
                                <v-col cols="3" class="float-right">
                                    <v-text-field
                                        class="tf-data"
                                        v-model="parameters.steps"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        single-line
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-slider
                                class="option-slider"
                                v-model="parameters.steps"
                                :max="50"
                                :min="20"
                                :step="1"
                                >
                            </v-slider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-row class="option-item">
                                <v-col cols="9" align-self="center">
                                    <p class="label-data">프롬프트 영향력 (권장 7~12)</p>
                                </v-col>
                                <v-col cols="3" class="float-right">
                                    <v-text-field
                                        class="tf-data"
                                        v-model="parameters.cfg_scale"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        single-line
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-slider
                                class="option-slider"
                                v-model="parameters.cfg_scale"
                                :max="15"
                                :min="1"
                                :step="1"
                                >
                            </v-slider>
                        </v-col>
                        <!-- <v-col cols="6">
                            <v-row class="option-item">
                                <v-col cols="9" align-self="center">
                                    <p class="label-data">너비</p>
                                </v-col>
                                <v-col cols="3" class="float-right">
                                    <v-text-field
                                        class="tf-data"
                                        v-model="parameters.width"
                                        type="number"
                                        density="compact"
                                        variant="outlined"
                                        hide-details
                                        single-line
                                        >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-slider
                                class="option-slider"
                                v-model="parameters.width"
                                :max="1024"
                                :min="256"
                                :step="1"
                                >
                            </v-slider>
                        </v-col> -->
                    </v-row>
                </v-container>
                <v-btn :loading="isLoading" class="btn float-right" @click="sendRequest()">
                    생성하기
                </v-btn>
            </v-col>
            <v-col cols="5" class="right">
                <p>갤러리</p>
                <p style="font-size: x-small; color: gray;">본 시스템(서비스)은
                <v-img style="display: inline-block;" :src="require('@/assets/image01.png')" width="70" height="15"></v-img>
                의 지원을 받아 개발되었습니다.</p>
              <v-container fluid>
                <v-row align="center" justify="center">
                    <v-progress-linear v-if="isLoading" indeterminate></v-progress-linear>
                    <v-col :cols="10">
                        <v-img :min-width="512" :min-height="512" :src="'data:image/png;base64,' + images[imgSelected]" @click="dialog = true">
                        <template v-slot:placeholder>
                            <div class="d-flex align-center justify-center fill-height">
                            <img src="@/assets/logo1.png"/>
                            </div>
                        </template>
                        </v-img>
                    </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <v-col :cols="1" v-for="(image, index) in images" :key="image" flat tile class="d-flex">
                    <v-img
                      outlined 
                      :src="'data:image/png;base64,' + image" 
                      :height="80"
                      :width="80"
                      @click.stop="imgSelected = index"
                      :style="index === imgSelected ? 'border: 2px #00FF22 solid;' : ''"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
              </v-container>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog"
              :width="parameters.width"
              :height="parameters.height">
      <v-card>
        <!-- <v-toolbar dense floating color="elevation-0">
          <v-spacer></v-spacer>
          <v-btn icon color="black" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar> -->
        <v-img :src="'data:image/png;base64,' + images[imgSelected]" @click="dialog = false"></v-img>
      </v-card>
    </v-dialog>
    <!-- Prompt Wizard -->
    <v-dialog v-model="promptWizard" width="1024">
      <PromptWizard></PromptWizard>
    </v-dialog>
</template>

<style>
    p {
        font-family: NanumSquareOTF;
        vertical-align: center;
        font-weight: 700;
    }

    .tf-data {
        float: right;
        min-width: 100px;
        max-width: 120px;
    }

    .label-data {
        float: left;
        font-size: 20px;
        font-weight: 700;
        color: #707070;
        align-self:center;
    }

    .btn {
        margin: 12px;
        color: #FFF;
        font-family: NanumSquareOTF;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        width: 240px;
        height: 60px;
        flex-shrink: 0;
        border-radius: 40px;
        border: 2px solid #D9D9D9;
        background: #00908F;
        box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    .option-slider {
        margin-top: 16px;
        margin-bottom: 16px;
    }

    .options {
        border-radius: 5px;
        border: 1px solid #E5E5E5;
        background: #FFF;
        margin: 4px;
        padding: 16px;
        box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.25);
    }

    .option-item {
        padding-left: 16px;
        padding-right: 16px;
    }

    .left {
        background: #E5E5E5;;
    }
    .right {
        background: #fff;
    }
    .subtitle {
        color: #000;
        font-family: NanumSquareOTF;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        align-self: center;
        margin-left: 8px;
    }
</style>
  
<script>
import axios from 'axios';
import PromptWizard from './PromptWizard.vue';

export default {
  data() {
    return {
      dialog: false,
      promptWizard: false,
      imgSelected: 0,
      parameters: {
        "prompt": "",
        "negative_prompt": "",
        // "styles": [
        // ],
        "seed": -1,
        // "subseed": -1,
        // "subseed_strength": 0,
        // "seed_resize_from_h": -1,
        // "seed_resize_from_w": -1,
        // "sampler_name": "string",
        // "batch_size": 1,
        "n_iter": 1,
        "steps": 20,
        "cfg_scale": 7,
        "width": 1024,
        "height": 1024,
        // "restore_faces": true,
        // "tiling": true,
        // "do_not_save_samples": false,
        // "do_not_save_grid": false,
        // "eta": 0,
        // "denoising_strength": 0,
        // "s_min_uncond": 0,
        // "s_churn": 0,
        // "s_tmax": 0,
        // "s_tmin": 0,
        // "s_noise": 0,
        // "override_settings": {},
        // "override_settings_restore_afterwards": true,
        // "refiner_checkpoint": "string",
        // "refiner_switch_at": 0,
        // "disable_extra_networks": false,
        // "comments": {},
        // "enable_hr": false,
        // "firstphase_width": 0,
        // "firstphase_height": 0,
        // "hr_scale": 2,
        // "hr_upscaler": "string",
        // "hr_second_pass_steps": 0,
        // "hr_resize_x": 0,
        // "hr_resize_y": 0,
        // "hr_checkpoint_name": "string",
        // "hr_sampler_name": "string",
        // "hr_prompt": "",
        // "hr_negative_prompt": "",
        // "sampler_index": "Euler",
        // "script_name": "",
        // "script_args": [],
        // "send_images": true,
        // "save_images": false,
        // "alwayson_scripts": {}
      },
      options_payload: {
        "sd_model_checkpoint": "absolutereality_v16.safetensors [be1d90c4ab]",
      },
      isLoading: false,
      images: []
    };
  },
  components: {
    PromptWizard
  },
  methods: {
    async setOption() {
       try {
        const response = await axios.post("", this.options_payload)
        console.log(response.data)
       } catch (error) {
        console.error('Error: ', error)
       } 
    }, 
    async sendRequest() {
      try {
        this.isLoading = true;
        
        var params = {...this.parameters};
        const translated = await this.translate(params.prompt);
        console.log(translated);

        params.prompt = translated;
        params.prompt += ", <lora:Daegu_v2:1>";
        params.negative_prompt = "nsfw, worst quality" + params.negative_prompt;
        
        const response = await axios.post('', params);
        console.log(response)
        this.images = response.data.images;
        this.isLoading = false;
      } catch (error) {
        console.error('API 요청 중 오류 발생:', error);
        this.isLoading = false;
      }
    },
    async translate(prompt) {
        const param = {
            prompt: prompt
        };

        const response = await axios.post('', param);

        return response.data.message.result.translatedText;
    }
  }
};
</script>
