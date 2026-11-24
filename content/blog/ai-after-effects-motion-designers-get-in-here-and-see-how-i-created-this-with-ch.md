---
title: "AI + After Effects: Motion designers get in here and see how I created this with ChatGPT"
date: 2024-07-27
category:
  - Makes
summary: "How Mirabelle used ChatGPT to generate an After Effects expression and build a motion design."
seo_title: "AI + After Effects: Using ChatGPT for Motion Design"
seo_description: "Mirabelle Morah shows how she used ChatGPT to generate an After Effects expression and guide her through making a motion design."
draft: false
---

[Watch or view the embedded content](https://player.vimeo.com/video/990927646?app_id=122963)

> *I used ChatGPT to generate an expression and guide me on how to make this design, and it did. When you read on you’ll see how to do it yourself*

***Experience level needed to replicate this:*** *mhmmm… easy stuff, just some level of knowledge about AfterEffects and belief that you can do this.*

After Effects expressions are small snippets of code (JavaScript) that we use to work smarter while animating. You can automate simple to complex tasks, ideas, animations, and actions with an expression. For example, you can link properties from layer A to layer B and make layer B only move when layer A moves.

I wanted to see how ChatGPT could help me work smarter and cooler on AfterEffects, so my first task was to have ChatGPT help me create this by giving me the expression. Below is what I created and how I went about it on ChatGPT.

## I used this prompt on ChatGPT

> “write an expression for after effects that allows me to use an object to make other items grow bigger as the object comes close to them. Explain how I can implement it too”

## Below’s ChatGPT’s response

([click here to read the full chat](https://chatgpt.com/share/961e585b-166f-466c-9253-d7db35983f49))

To create an effect in Adobe After Effects where objects grow larger as another object (e.g., a Null object) approaches them, you can use expressions to link the Scale property of the objects to the distance between them and the moving object. Here’s a step-by-step guide on how to implement this:

### 1. Setup the Scene

![](https://cdn-images-1.medium.com/max/800/0*vLZF-fKoHCDbwHAo)

- Create the Control Object (e.g., Null Object):
- Position Objects:

### 2. Add the Expression to Each Object’s Scale Property

For each object that you want to grow as the Null object gets closer, you’ll add an expression to its Scale property.

Steps:

- **Select an Object**: Select one of the layers you want to affect.
- **Open the Scale Property:** Press S to reveal the Scale property.
- **Add an Expression:** Alt-click (Option-click on Mac) the stopwatch icon next to the Scale property to add an expression.
- **Enter the Expression below:** Use the following expression to link the scale of the object to the distance between it and the Control Null:

``` graf
// Define the layers
controlLayer = thisComp.layer("Control Null");
objectLayer = thisLayer;

// Get the positions
controlPos = controlLayer.position;
objectPos = objectLayer.position;

// Calculate the distance
distance = length(controlPos, objectPos);

// Define the parameters for scaling
maxDistance = 500; // Distance at which the object stops growing
minScale = 50; // Minimum scale percentage
maxScale = 200; // Maximum scale percentage

// Interpolate the scale based on the distance
scaleFactor = linear(distance, 0, maxDistance, maxScale, minScale);

[scaleFactor, scaleFactor]
```

### 3. Apply the Expression to Other Objects

- Copy the expression and apply it to the Scale property of other objects in your composition. Just ensure the “Control Null” name is consistent across all expressions.

![](https://cdn-images-1.medium.com/max/800/0*LK4IX55SGyM1K7Jk)

### 4. Test and Fine-Tune

- Move the Control Null around and observe how the objects scale. You may need to adjust maxDistance, minScale, and maxScale to get the desired effect.

### 5. Optional: Customize the Effect

- You can customize this setup further, such as adding a different scaling behavior or controlling other properties like opacity or color. For instance, you could add another control to fine-tune the falloff rate or change the scale effect direction.

## I tried Google Gemini but something was off

I tried using Google Gemini to generate the same expression with the same prompt for me, and it did. But I got stuck and confused because the code didn’t work on my AE. Below is Gemini’s version of the code with the exact same prompt.

``` graf
// Target object is the object you want to grow

// Source object is the object that triggers the growth
dist = length(thisLayer.position - thisComp.layer("Source Object").position);
maxDist = 200; // Adjust this value to control the maximum distance for growth

scaleFactor = linear(dist, 0, maxDist, 1.5, 1); // Adjust scale values as needed

[scaleFactor, scaleFactor]
```

![](https://cdn-images-1.medium.com/max/800/0*e3E7nUXGeDeqQ02B)

When I got stuck, I asked ChatGPT for answers on why it wasn’t working. Here’s ChatGPT’s version, which eventually worked.

``` graf
// Define the source object layer (the one that moves)
sourceLayer = thisComp.layer("Source Object");

// Calculate the distance between the current layer and the source layer
dist = length(thisLayer.position, sourceLayer.position);

// Define the maximum distance for full scale effect
maxDist = 200;

// Scale factor: 1.5 means 150% of the original size at 0 distance, 1 means 100% at maxDist
scaleFactor = linear(dist, 0, maxDist, 1.5, 1);

// Apply the same scale factor to both x and y scales
[scaleFactor  100, scaleFactor  100]
```

![](https://cdn-images-1.medium.com/max/800/0*0K_f5bgwcxPbycfR)

![](https://cdn-images-1.medium.com/max/800/1*rThgnR-m8C2UZXHRNtsUfw.gif)

**Extra resources**

[Mirabelle Morah’s website](http://www.mirabellemorah.com/)  
[How to make gradients on AfterEffects](https://www.youtube.com/watch?v=mabEyc_Z_ok)
