#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float vYPosition;

uniform sampler2D uSampler; // Base texture
uniform sampler2D uSampler2; // Cloud texture
uniform float timeFactor;

float random(vec2 co) {
	return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 co) {
	vec2 seed = floor(co);
	vec2 f = fract(co);
	f = f * f * (3.0 - 2.0 * f);
	float n = mix(mix(random(seed), random(seed + vec2(1.0, 0.0)), f.x), mix(random(seed + vec2(0.0, 1.0)), random(seed + vec2(1.0, 1.0)), f.x), f.y);
	return n;
}

void main() {
	vec4 baseColor = texture2D(uSampler, vTextureCoord);
	vec4 finalColor = baseColor;

	float randomOffset = noise(vTextureCoord * 10.0 + (timeFactor / 8.0)) * 0.05 - 0.01;
	float threshold = 0.5 + randomOffset;

	if (vYPosition + 1.0 > threshold) {
		vec2 perturb1 = vec2(noise(vTextureCoord * 5.0 + timeFactor) * 0.02, noise(vTextureCoord * 5.0 - timeFactor) * 0.02);
		vec2 perturb2 = vec2(noise(vTextureCoord * 10.0 + timeFactor) * 0.02, noise(vTextureCoord * 10.0 - timeFactor) * 0.02);
		vec2 perturb3 = vec2(noise(vTextureCoord * 20.0 + timeFactor) * 0.02, noise(vTextureCoord * 20.0 - timeFactor) * 0.02);
		vec2 perturb4 = vec2(noise(vTextureCoord * 30.0 + timeFactor) * 0.02, noise(vTextureCoord * 30.0 - timeFactor) * 0.02);
		vec2 perturb5 = vec2(noise(vTextureCoord * 40.0 + timeFactor) * 0.02, noise(vTextureCoord * 40.0 - timeFactor) * 0.02);
		
		vec2 cloudTexCoord1 = fract(vTextureCoord + vec2(timeFactor * 0.02, timeFactor * 0.01) + perturb1);
		vec2 cloudTexCoord2 = fract(vTextureCoord + vec2(timeFactor * 0.02, timeFactor * 0.01) + perturb2);
		vec2 cloudTexCoord3 = fract(vTextureCoord + vec2(timeFactor * 0.02, timeFactor * 0.01) + perturb3);
		vec2 cloudTexCoord4 = fract(vTextureCoord + vec2(timeFactor * 0.02, timeFactor * 0.01) + perturb4);
		vec2 cloudTexCoord5 = fract(vTextureCoord + vec2(timeFactor * 0.02, timeFactor * 0.01) + perturb5);
		
		vec4 cloudColor1 = texture2D(uSampler2, cloudTexCoord1);
		vec4 cloudColor2 = texture2D(uSampler2, cloudTexCoord2);
		vec4 cloudColor3 = texture2D(uSampler2, cloudTexCoord3);
		vec4 cloudColor4 = texture2D(uSampler2, cloudTexCoord4);
		vec4 cloudColor5 = texture2D(uSampler2, cloudTexCoord5);

		vec4 cloudColor = (cloudColor1 + cloudColor2 + cloudColor3 + cloudColor4 + cloudColor5) / 5.0;
		
		float blendFactor = smoothstep(0.3, 0.8, cloudColor.a);
		blendFactor = clamp(blendFactor, 1.0, 0.6);
		finalColor = mix(baseColor, cloudColor, blendFactor);
	}
	gl_FragColor = finalColor;
}
