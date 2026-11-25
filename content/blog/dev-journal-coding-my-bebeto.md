---
title: "Dev journal: coding my bebeto"
date: 2025-01-27
category:
  - Makes
summary: "The story behind Bebeto, the first website Mirabelle ever developed."
seo_title: "Dev Journal: Coding My Bebeto | Mirabelle Morah"
seo_description: "In this dev journal, Mirabelle Morah shares the story of Bebeto, the first website she ever developed."
draft: false
---

![](https://cdn-images-1.medium.com/max/2560/1*T5KF2w6HeeUfLd-xM2aAgg.png)

*“Hey bebeto, when we first met, I fell in love with you. Nothing in this cute wild wide world prepared me for the fresh breath of sunflowers 🌻 you bring to my life…”*

**What:** *Bebeto* was the first website I ever developed with SuperHi Coding Editor. I came across SuperHi’s free course, [Plan, Design + Code Your First Website](https://www.superhi.com/catalog/plan-design-and-code-your-first-website), and then I saw the body of beautiful student work they were showcasing I *thought ooh la la!* I need to try this.

![](https://cdn-images-1.medium.com/max/800/1*J3mX-sM08QUEvYNog1M74Q.gif)

Being new to coding, the course was instructive and interesting. Once I was done with it I made this post about it on [Twitter](https://x.com/MirabelleMorah/status/1856685642274492608).

## Links

- [View my bebeto on SuperHi](https://bebeto.superhi.hosting/index.html)
- [GitHub Repo](https://github.com/mirabellemorah/bebeto)
- [Git Page](https://mirabellemorah.github.io/bebeto/index.html)

## Tools used

1.  SuperHi Editor
2.  Adobe Illustrator
3.  Figma
4.  GitHub
5.  Google Fonts

## Process

**Doing my own thing:** The course example was very different from what I did. I decided to come up with my own storyline. I used Adobe Illustrator to make quick and simple mockups of the faces of the *lover*, crying about why its Bebeto broke its heart.

![](https://cdn-images-1.medium.com/max/800/1*Ja1g7w5pC6meK2yz_bcS-Q.gif)

## Learnings and frustrations

The major thing I learned here was about using grids to partition display sections. Being new to this and my brain still forming neural pathways, it kind of hurt my head how much exciting information I had to understand. Before developing Bebeto, I’d actually developed [‘Girl Code’](https://mirabellemorah.github.io/girlcode/) about 3 months before Bebeto. Girl Code was lush, green beautiful and the first website I ever fully made only using codes. [However, Girl Code](https://github.com/mirabellemorah/girlcode) was simple, made in a column (block display) and only needed a few lines of code. Bebeto was different, I had to use rows and columns and I also had to use media queries to define the width on mobile.

I also discovered this [page that shows how to input text and images into README.md files](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) on GitHub.

## Remarkable piece of code

![](https://cdn-images-1.medium.com/max/800/1*69M7PYW0QcuAWqIpHZ_yIg.gif)

It’s the subtle hero text gradient animation for me.

``` graf
h1.large {
font-size: clamp(6rem, 2vw + 5.9rem, 7rem);
font-weight: 800;
color: black; /* Initial color */
transition: color 0.5s ease; /* Smooth transition for color change */
background: linear-gradient(
90deg,
#e29c89,
#f9f8f0,
#f9f8f0,
#e29c89
); /*(90deg, #ff7e5f, #feb47b, #ff7e5f*/
background-size: 200% 200%;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
animation: moveRight 3s infinite alternate;
}

@keyframes moveRight {
from {
background-position: 0% center;
}
to {
background-position: -200% center;
}
}
```

## Embrace the learning discomfort

Learning to code isn’t always smooth. When I was figuring out grids and media queries, my brain felt like it was doing gymnastics! 😅 But here’s the secret: **that mental stretch is where real growth happens.**

**Pro Tip:** Tutorials are roadmaps, not prison sentences. Use them, then break free and design something that speaks to YOUR heart. So start small. Be bold. Keep learning and having fun!

Your first projects won’t be perfect — and that’s absolutely okay. Each line of code is a step in your unique journey.

*Hi 👋🏽 I’m* [*Mirabelle*](https://www.mirabellemorah.com/)*. I create motion designs and develop data and people-driven communication strategies, especially for high-impact social enterprises and bodies. I’m always exploring something creative, whether it’s coding websites, making animations or working with young people.*
