---
title: "Dev journal + adventure: these illustrated smiles are more than just code"
date: 2025-03-03
category:
  - Makes
summary: "The real story behind the Illustrated Smiles website, built on SuperHi with Mirabelle's illustrations."
seo_title: "Dev Journal: The Illustrated Smiles Website"
seo_description: "Mirabelle Morah shares the story behind the Illustrated Smiles website, built on SuperHi with her own illustrations."
draft: false
---

![](https://cdn-images-1.medium.com/max/2560/1*Rdq27Z6kj2QqmnEpYqd5eA.png)  
*Illustrations by Mirabelle Morah*

## The real story behind these pixels

To be real with you, building this [*Illustrated Smiles* website](https://boyce-smiles.superhi.hosting/index.html) on SuperHi + illustrating everything there wasn’t just about writing perfect code and making sure all my flexboxes were aligned well (*I mean duh they should be*) — it was about discovering more about my creative ability to not just follow *class* rules, but to try other things as a developer and storyteller.

You see, whilst following the SuperHi course on Foundational HTML, CSS + JavaScript, [I’ve been doing my own thing.](https://github.com/mirabellemorah/SuperHi-Foundation-HTML-CSS-JS/tree/main) Using my own images, crafting different stories to develop websites off of, while following principles and theories. That way I’m not merely mirroring my tutor but infusing my own style, curiosity and experiments into things.

![](https://cdn-images-1.medium.com/max/800/1*Z7iPMNT5JAG2ad4M-xIgCg.gif)  
*Illustrations I created from Ufot Ubon’s vector illustration course*

## Creating the website taught me valuable lessons in modern web design and development including:

- Responsive design techniques for optimal viewing across devices
- Implementing smooth scroll effects to ensure user experience is good
- Using CSS animations to create engaging visual elements
- Integrating SVG graphics for scalable, high-quality visuals

## 💡 1 lesson from me to you that hit different

### **Embrace the messy middle (this one’s also a marketing term** [**Google**](https://www.thinkwithgoogle.com/intl/en-emea/consumer-insights/consumer-journey/navigating-purchase-behavior-and-decision-making/) **once used about understanding users’ purchasing behaviour)**

When tags and divs weren’t working perfectly, I could’ve gotten frustrated (I was, actually). Instead, I remembered Eckhart Tolle’s wisdom: t*o enjoy the journey, not just the destination.* So I looked at every “broken” code as another opportunity to learn by another method and experiment more.

## Tools I used:

- [SuperHi Editor](https://boyce-smiles.superhi.hosting/index.html)
- Adobe Illustrator
- Ufot Ubon’s [latest vector illustration course](https://selar.co/713r72?currency=GBP)
- [GitHub](https://github.com/mirabellemorah/SuperHi-Foundation-HTML-CSS-JS/tree/main/Week%204/Smiles)
- My wild imagination

But the real magic? Staying curious and playful.

## Remarkable lines of code that made me go “Whoa!”

![](https://cdn-images-1.medium.com/max/800/1*nbKp9BGETMZN_pNxmaR-jg.gif)

The opacity feature on the [“List” page](https://boyce-smiles.superhi.hosting/list.html) (use desktop for the best experience) makes images appear by the side on hover. I love it! View the [GitHub repository here.](https://github.com/mirabellemorah/SuperHi-Foundation-HTML-CSS-JS/tree/main/Week%204/Smiles)

``` graf
.list {
font-size: 50px;
max-width: 640px;
margin-left: 20px;
margin-right: auto;
margin-top: 120px;
padding: 20px;
}

.list a img {
opacity: 0;
position: fixed;
top: 45%;
left: 75%;
transform: translate(-50%, -50%);
transition: opacity 0.3s;
width: 350px;
border-radius: 30px;
}

.list a:after {
content: '/';
}

.list a:last-child:after {
content: '';
}

.list a:hover img {
opacity: 0.81;
pointer-events: none;
}
```

## The frustration that’s become my super-researching power

Cross-browser compatibility especially on mobile drives me into deep debugging states. What’s wrong? Why isn’t it working? What can I do differently?

## Pro developer mindset shift 🧠

- Celebrate every win
- Keep learning
- Document your flow

## My biggest takeaway?

I see coding as akin to a kind of technological, mathematical and scientific art. You’re not just building websites — you’re creating experiences, telling stories, solving problems. I see it this way because I come from a marketing and literary background. One that is always looking into data to make decisions while studying user psychology.

Remember: Your first version doesn’t have to be perfect. It just has to exist. 💪

*Hi 👋🏽 I’m* [*Mirabelle*](https://www.mirabellemorah.com/)*. I create motion designs and develop data and people-driven communication strategies, especially for high-impact social enterprises and bodies. I’m always exploring something creative, whether it’s coding websites, making animations or working with young people.*
