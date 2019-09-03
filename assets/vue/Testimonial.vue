<template>
    <div class="w-slide">
        <div class="div-block-7"><img alt="" class="image-5" :src="image">
            <p class="paragraph-4">{{description}}</p>
            <p class="paragraph-5">{{name}} {{surname}}<br></p>
            <p class="paragraph-6">{{company}}<br></p>
            <div class="div-block-8"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Testimonial",
    props: {
        image: {
            type: String
        },
        description: {
            type: String
        },
        name: {
            type: String,
        },
        surname: {
            type: String
        },
        company: {
            type: String
        }
    }
}
</script>

<style scoped>

</style>
