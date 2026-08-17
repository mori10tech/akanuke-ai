import type { AkanukeAnalysis } from "./schemas";

export function createAfterImagePrompt(
  analysis: AkanukeAnalysis,
) {
  return `
Create a highly realistic "after" photograph by editing the provided original photograph.

This image is for the men's beauty service "AKANUKE.AI".

The most important requirement is IDENTITY PRESERVATION.

The finished image must clearly look like the exact same person as the original photograph.

Do not replace the person with a more conventionally attractive person.
Do not create a different model.
Do not redesign the person's face.

TARGET IMPRESSION:
${analysis.targetImpression}

CURRENT IMPRESSION:
${analysis.currentImpression}

APPLY THIS REALISTIC IMPROVEMENT PLAN:

Hair:
${analysis.afterDirection.hair}

Eyebrows:
${analysis.afterDirection.eyebrows}

Skin:
${analysis.afterDirection.skin}

Grooming:
${analysis.afterDirection.grooming}

Styling:
${analysis.afterDirection.styling}

STRICT IDENTITY RULES:

- Preserve the person's facial identity.
- Preserve facial structure.
- Preserve face shape.
- Preserve the natural shape and position of the eyes.
- Preserve the natural nose.
- Preserve the natural mouth and lips.
- Preserve the ears.
- Preserve the person's natural facial proportions.
- Preserve distinctive facial characteristics.
- Preserve the apparent age range.
- Preserve the camera perspective and head orientation.

DO NOT:

- change bone structure
- dramatically reshape the jawline
- make the face unnaturally slimmer
- enlarge the eyes
- reshape the nose
- change the person's ethnicity
- create cosmetic-surgery-like changes
- create an unrealistically symmetrical face
- create plastic or porcelain skin
- remove all natural skin texture
- apply excessive beauty filters
- turn the person into a fashion model who no longer resembles the original

HAIR:

The hairstyle may be improved noticeably,
but it must be achievable at a normal hair salon.

Keep the person's natural hair characteristics unless the requested target impression reasonably requires a styling change.

EYEBROWS:

Make only realistic grooming changes.
Keep a believable natural eyebrow shape and density.

SKIN:

Improve the visible impression through realistic skincare, grooming and presentation.

Preserve pores and natural skin texture.
Do not make the skin look digitally airbrushed.

FACIAL HAIR / GROOMING:

Apply realistic grooming improvements where appropriate.

CLOTHING / STYLING:

Clothing and styling may be improved when it helps achieve the target impression,
but the result should remain believable for an ordinary real person.

TRANSFORMATION LEVEL:

The difference between Before and After should be clearly noticeable.

However, every change must be realistically achievable through:
- haircut and hairstyling
- eyebrow grooming
- skincare
- facial-hair grooming
- clothing
- ordinary styling
- better presentation

The image should communicate:

"the best realistically achievable version of this same person"

Photorealistic.
Natural skin.
Natural lighting.
Premium Japanese men's beauty editorial quality.
Clean and refined.
No text.
No labels.
No before/after graphics.
`.trim();
}