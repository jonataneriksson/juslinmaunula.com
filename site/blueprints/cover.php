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
      videoslide:
        label: Video Slide
        fields:
          video:
            label: Left Side
            type: selector
            mode: single
            width: 1/1
            types:
              - video
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
