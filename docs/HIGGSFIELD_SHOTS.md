# Higgsfield shot list

Every cinematic still and clip on the site was made with Higgsfield from the prompts below, through its API. The site shows each one with a visible "SI-generated" mark.

- **Stills:** Higgsfield image model (`marketing-studio/image/sunburst`), 16:9, 2K.
- **Clips:** Seedance 2.5 image-to-video (`bytedance/seedance-2.5/image-to-video`), 5 seconds, 720p, no sound, each started from its still.
- **One spacecraft:** `ship_ref` was made first, and every other spacecraft still was given it as a reference picture, so the ship is the same in every shot.
- **One REGO:** the four `rego_` shots were each given the game's own picture of REGO (`assets/img/c_rego.jpg` in the game) as their first reference, so the robot in the films is the robot in the game. Two of them were also given a game picture of the place (the Moon base, the Mars outpost).
- **Two shots start from pictures the game already has:** `moon_impact` starts from the game's meteoroid event card, and `mars_landing` uses the game's Mars outpost picture as a second reference.

Shared style for stills: Grounded space-agency engineering realism with the restrained production design of a prestige science-fiction film. Photorealistic cinematic film still, anamorphic lens, natural film colour grade, deep blacks, ultra detailed. No people, no text, no letters, no numbers, no labels, no user interface, no logos, no flags, no insignia, no watermark.

Shared direction for clips: Physically believable motion, steady cinematic camera, no cuts, no text, no logos. Keep the spacecraft's shape and markings exactly as in the first frame.

Shared style for REGO's stills: The robot is REGO, exactly as in the first reference image: a small friendly helper robot about knee high, with a white rounded body with one orange band, two dark tank treads, a wide rounded white head with orange ear discs and one dark glass visor showing two big glowing cyan oval eyes, a thin antenna with a small amber light, a round warm headlamp on its chest and two short white arms with dark hands. Shown as a real physical robot. Grounded space-agency engineering realism with the restrained production design of a prestige science-fiction film. Photorealistic cinematic film still, anamorphic lens, natural film colour grade, ultra detailed. No people, no text, no letters, no numbers, no labels, no logos, no flags, no insignia, no watermark.

Shared direction for REGO's clips: Physically believable motion, steady cinematic camera, no cuts, no text, no logos. Keep the robot's shape, colours and face exactly as in the first frame: white body, orange band, dark treads, dark visor with two glowing cyan eyes.

| Shot | Where it is used | Files |
|---|---|---|
| `ship_ref` | Opening, second quarter; also the page poster | `assets/video/ship_ref.mp4`, `assets/video/ship_ref.jpg` |
| `ship_far` | Opening, first quarter of the scroll | `assets/video/ship_far.mp4`, `assets/video/ship_far.jpg` |
| `ship_journey` | Opening, third quarter | `assets/video/ship_journey.mp4`, `assets/video/ship_journey.jpg` |
| `earth_arrival` | Earth arrival (loops) | `assets/video/earth_arrival.mp4`, `assets/video/earth_arrival.jpg` |
| `moon_flyover` | Moon arrival, first half of the scroll | `assets/video/moon_flyover.mp4`, `assets/video/moon_flyover.jpg` |
| `moon_impact` | Moon, scene A (loops) | `assets/video/moon_impact.mp4`, `assets/video/moon_impact.jpg` |
| `mars_travel` | Mars arrival, first third of the scroll | `assets/video/mars_travel.mp4`, `assets/video/mars_travel.jpg` |
| `mars_landing` | Mars arrival, middle third | `assets/video/mars_landing.mp4`, `assets/video/mars_landing.jpg` |
| `final_wide` | The ending, first half of the scroll | `assets/video/final_wide.mp4`, `assets/video/final_wide.jpg` |
| `rego_cockpit` | Opening, last quarter: REGO welcomes you aboard | `assets/video/rego_cockpit.mp4`, `assets/video/rego_cockpit.jpg` |
| `rego_moon` | Moon arrival, second half: REGO finds the broken solar panel | `assets/video/rego_moon.mp4`, `assets/video/rego_moon.jpg` |
| `rego_mars` | Mars arrival, last third: REGO rolls onto Mars | `assets/video/rego_mars.mp4`, `assets/video/rego_mars.jpg` |
| `rego_farewell` | The ending, second half: REGO waves goodbye | `assets/video/rego_farewell.mp4`, `assets/video/rego_farewell.jpg` |

## Prompts

### ship_ref

**Still.** A long-range crew spacecraft floating in deep space, seen in three-quarter view from the front left, filling most of the frame. White and light-grey hull with visible panel seams and a few rust-orange accent stripes; a rounded cockpit with a dark wraparound glass canopy at the nose; a cylindrical mid body; two long dark-blue rectangular solar wings, one on each side; two smaller white radiator fins; a cluster of four engine bells at the rear glowing soft blue. Hard sunlight from the upper left, deep black sky with small sharp stars.

**Clip (5 s).** The camera slowly orbits a quarter turn around the spacecraft, from the front left toward its side, while the four rear engines brighten from a dim glow to a steady soft blue.

### ship_far

**Still.** The same spacecraft as in the reference image, now small and distant in the middle of the frame, seen from the front, in an almost completely black field of deep space with only a few faint stars. Its four rear engines give a faint soft blue glow that rims its hull. Very dark, quiet, mysterious.

**Reference pictures:** `ship_ref`

**Clip (5 s).** The camera drifts slowly and steadily toward the distant spacecraft, which grows larger in the middle of the frame as more stars fade in and its blue engine glow brightens.

### ship_journey

**Still.** The same spacecraft as in the reference image seen from directly behind and slightly above, its four engine bells burning bright blue-white, flying away from the camera into deep space toward a small distant blue Earth with a tiny grey Moon beside it. Stars sharp against black.

**Reference pictures:** `ship_ref`

**Clip (5 s).** The spacecraft accelerates away from the camera; its engines flare brighter, and the stars begin to stretch into short streaks past the camera as the camera follows behind it.

### earth_arrival

**Still.** The same spacecraft as in the reference image in low orbit above the Earth, small in the upper third of the frame, with the curved blue horizon of the Earth filling the lower half: white cloud bands over deep blue ocean and a thin glowing line of atmosphere against black space. Sunlight glints on its solar wings.

**Reference pictures:** `ship_ref`

**Clip (5 s).** The spacecraft glides slowly forward along its orbit while the clouds and ocean of the Earth turn gently underneath and the thin blue line of the atmosphere glows on the horizon.

### moon_flyover

**Still.** The same spacecraft as in the reference image flying low over the grey surface of the Moon toward the horizon, seen from behind and above. Large craters, scattered boulders and long black shadows from a low Sun; in the distance a wide dark pit in a flat lava plain with a small white station and a field of solar panels at its rim, tiny warm lights glowing. Pure black sky with no stars near the bright ground, a small blue Earth low over the horizon.

**Reference pictures:** `ship_ref`

**Clip (5 s).** A low forward flight over the cratered lunar surface: the ground and its long shadows slide toward the camera as the spacecraft heads for the distant station at the rim of the pit.

### moon_impact

**Starts from:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/ev2_meteor.jpg

**Clip (5 s).** A meteoroid strikes the lunar surface near the station: a silent bright flash, a spray of grey dust and rocks thrown outward in straight lines with no air to slow them, and amber emergency lights begin to pulse on the station. No sound, no fire, no smoke: there is no air on the Moon.

### mars_travel

**Still.** The same spacecraft as in the reference image seen from behind on the left side of the frame, coasting through deep space toward Mars, which is a small rust-red disc with faint darker markings and a white polar cap far ahead on the right. Engines dim. Deep black sky with sharp stars.

**Reference pictures:** `ship_ref`

**Clip (5 s).** The spacecraft coasts silently toward Mars; the red planet slowly grows larger ahead while the stars stay still.

### mars_landing

**Still.** A squat white landing craft with four legs descending on bright engine flames toward a rust-brown rocky Martian plain, kicking up a ring of tan dust beneath it. In the middle distance a small outpost of white habitat modules with a low dome, a pink-glowing greenhouse tunnel and a field of solar panels, as in the second reference image. A butterscotch-tan hazy sky with a small pale Sun; a tall wall of dust from an approaching storm on the horizon.

**Reference pictures:** `ship_ref`, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/mars/mr_base.jpg

**Clip (5 s).** The landing craft descends slowly on its engines and touches down; a ring of tan dust billows outward along the ground and drifts away, while the dust storm on the horizon creeps closer.

### final_wide

**Still.** The same spacecraft as in the reference image, small in the lower left, flying away from the camera into deep space. Ahead of it, in one wide view: the large blue Earth on the right partly in shadow, the small grey Moon near it, and far away to the left a tiny rust-red point that is Mars. A soft glow from the Sun just out of frame. Quiet, vast, hopeful.

**Reference pictures:** `ship_ref`

**Clip (5 s).** The camera pulls slowly backward as the spacecraft flies on toward the worlds ahead, its engines a steady soft blue; the Earth and the Moon drift very slightly.

### rego_cockpit

**Still.** REGO inside the cockpit of a spacecraft, standing on the deck between two empty pilot seats, turned three-quarters toward the camera. Behind it a wide curved canopy window shows deep space with a small blue Earth, a tiny grey Moon and a tiny rust-red Mars. Beside REGO a pale cyan holographic star map floats above a console. Soft cool light from the window, warm light from its chest lamp.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg

**Clip (5 s).** REGO turns its head toward the camera, its cyan eyes blink once, and it raises one short arm and waves; the holographic star map beside it brightens and slowly turns.

### rego_moon

**Still.** REGO on the grey surface of the Moon beside a solar panel that has been knocked over and cracked, looking up at it. Behind, a white lunar station at the rim of a wide dark pit, as in the second reference image, with small amber warning lights. Hard low sunlight, long black shadows, pure black sky, a small blue Earth above the horizon. Tread marks in the dust.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/title2.jpg

**Clip (5 s).** REGO rolls a little closer to the broken solar panel on its treads, leaving marks in the dust, points one short arm at the crack, then turns its head to look at the camera. Amber warning lights pulse on the station behind. No sound, no smoke, no fire.

### rego_mars

**Still.** REGO on a rust-brown rocky Martian plain at the foot of a lander's ramp, looking out toward a small outpost of white habitat modules with a low dome and a field of solar panels, as in the second reference image. A butterscotch-tan hazy sky with a small pale Sun, fine dust drifting low over the ground, a wall of dust from a distant storm on the horizon.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg, https://ruibinray.github.io/NASA-MoonKeeper/assets/img/mars/mr_base.jpg

**Clip (5 s).** REGO rolls forward off the ramp onto the Martian soil, its treads raising a little dust, stops, and turns its head slowly from the outpost to the camera while thin dust blows past.

### rego_farewell

**Still.** REGO seen from behind and slightly to one side, standing at a large observation window of a spacecraft, looking out at the big blue Earth, the small grey Moon and a tiny rust-red Mars far away. Its chest lamp throws a soft warm glow on the window frame; the cabin is dark and quiet.

**Reference pictures:** https://ruibinray.github.io/NASA-MoonKeeper/assets/img/c_rego.jpg

**Clip (5 s).** REGO turns round from the window to face the camera, its cyan eyes curve into a happy shape, and it lifts one short arm and waves goodbye while the Earth turns slowly behind it.

## Making them again

```bash
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots.json art
HF_KEY="<key id>:<key secret>" node tools/hf_batch.mjs tools/shots_rego.json art
bash tools/encode.sh
```

The key is read from the environment and is never written to a file. `art/` holds the full-size originals and is not committed. `tools/encode.sh` needs FFmpeg: it makes the 720p web files, and gives the clips that follow the scroll a keyframe every four frames so they can be stepped backwards and forwards.
