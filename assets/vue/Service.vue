<template>
    <div>
        <div class="w-container service"
             data-aos="fade-up"
             data-aos-duration="700"
        >
            <div class="div-block-icon_1">
                <img alt="" :class="[evenIndex ? 'image-4' : 'image-3']" :src="image">
                <div :class="[evenIndex ? 'div-block-4' : 'div-block-3']">
                    <h1 :class="[evenIndex ? 'heading-5' : 'heading-4']">
                        <strong :class="[evenIndex ? 'bold-text-3' : '']">{{label}}</strong>
                    </h1>
                    <p v-html="description"
                       :class="[evenIndex ? 'paragraph-3' : 'paragraph-2']">
                    </p>
                    <p v-if="additionalDescription"
                       class="show-details"
                       :class="[evenIndex ? '-right' : '']"
                       @click="toggleAdditionalDescriptionVisibility()"
                    >
                        {{additionalDescriptionVisible ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}}
                        <img class="chevron"
                             src="./images/chevron-down.svg"
                             :class="[ additionalDescriptionVisible ? 'chevron--up' : '' ]"
                        />
                    </p>
                </div>
            </div>
        </div>
        <p v-if="additionalDescriptionVisible"
           v-html="additionalDescription"
           class="additional-description"
        >
        </p>
    </div>

</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: false
        },
        label: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        additionalDescription: {
            type: String,
            required: false
        },
        evenIndex: Boolean,
    },
    data() {
        return {
            additionalDescriptionVisible: false
        }
    },
    methods: {
        toggleAdditionalDescriptionVisibility() {
            console.log('this.additionalDescriptionVisible', this.additionalDescriptionVisible);
            this.additionalDescriptionVisible = !this.additionalDescriptionVisible;
        }
    }
}
</script>

<style scoped>

</style>
