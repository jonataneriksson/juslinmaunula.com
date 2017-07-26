title: Cover Template
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
  slides:
    label: Slides
    type: builder
    fieldsets:
      slide:
        snippet: slide
        label: Slide
        fields:
          leftside:
            label: Left Side
            type: images
            width: 1/2
          rightside:
            label: Right Side
            type: images
            width: 1/2
          leftsidecolor:
            label: Left Side Color
            type: radio
            default: black
            options:
              white: White
              black: Black
            width: 1/2
          rightsidecolor:
            label: Right Side Color
            type: radio
            default: black
            options:
              white: White
              black: Black
            width: 1/2
