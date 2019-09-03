const contentful = require("contentful");
const Service = require("./Service.vue");
const Testimonial = require("./Testimonial.vue");
const richTextToHtmlRenderer = require('@contentful/rich-text-html-renderer');

const client = contentful.createClient({
    space: "a5horhfavmob",
    accessToken: "mEOwIiQcjUTUnAOOdN2znHyuCq_LwFzEHVJz6Wpc3XM"
});

const vueApp = new Vue({
    el: '#vue-app',
    data () {
        return {
            services: [],
            orderedServices: [],
            testimonials: [],
            slides: [],
            contentfulRichTextOptions: {
                renderNode: {
                    'embedded-asset-block': (node) =>
                        `<img class="img-fluid" src="${node.data.target.fields.file.url}"/>`
                }
            }
        }
    },
    methods: {
        getServices() {
            client.getEntries({content_type: 'services'}).then(response => {
                let parsedServices = response.items.map(item => {
                    const fields = item.fields.service;
                    return fields.map(service => {
                        return {
                            label: service.fields.label,
                            order: service.fields.order,
                            image: service.fields.image.fields.file.url,
                            description: richTextToHtmlRenderer.documentToHtmlString(service.fields.description, this.contentfulRichTextOptions),
                            additionalDescription: service.fields.additionalDescription ? richTextToHtmlRenderer.documentToHtmlString(service.fields.additionalDescription, this.contentfulRichTextOptions) : null
                        }
                    })

                });
                this.services = parsedServices[0];
            });
        },
        getSlides() {
            client.getEntries({content_type: 'slides'}).then(response => {
                let parsedSlides = response.items.map(item => {
                    const fields = item.fields;
                    return {
                        number: fields.number,
                        link: fields.link || null,
                        content: fields.slide.map(person => {
                            return {
                                name: person.fields.name,
                                link: person.fields.link,
                                surname: person.fields.surname,
                                position: person.fields.position,
                                photo: person.fields.photo.fields.file.url,
                                description: richTextToHtmlRenderer.documentToHtmlString(person.fields.description, this.contentfulRichTextOptions)
                            }
                        })
                    }
                });
                parsedSlides.sort((a, b) => a.number - b.number);
                this.slides = parsedSlides;
                $(document).ready(function () {
                    $('.team-slider').slick({
                        // asNavFor: '.team-captions',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        mobileFirst: true,
                        dots: true,
                        arrows: true,
                        responsive: [
                            {
                                breakpoint: 800,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            }
                        ]
                    });

                    // $('.team-captions').slick({
                    //     slidesToShow: 1,
                    //     slidesToScroll: 1,
                    //     dots: false,
                    //     navigation: false
                    // });
                });

            });
        },
        getTestimonials() {
            client.getEntries({content_type: 'testimonials'}).then(response => {
                let parsedTestimonial = response.items.map(item => {
                    const fields = item.fields.testimonial;
                    return fields.map(testimonial => {
                        return {
                            company: testimonial.fields.company,
                            description: testimonial.fields.description,
                            name: testimonial.fields.name,
                            surname: testimonial.fields.surname,
                            logo: testimonial.fields.logo.fields.file.url
                        }
                    });
                });
                this.testimonials = parsedTestimonial[0];
            });
        }
    },
    components: {
        Service,
        Testimonial
    },
    mounted () {
        this.getServices();
        this.getSlides();
        this.getTestimonials();
    }
});
