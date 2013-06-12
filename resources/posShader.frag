///*
#version 120

uniform sampler2D posTex;
uniform sampler2D velTex;
uniform sampler2D infTex;

uniform sampler2D spriteTex;

varying float age;




void main()
{
    /*
	vec4 colFac = vec4(texture2D(spriteTex, gl_PointCoord));
	colFac.rgb *= texture2D( posTex, gl_TexCoord[0].st ).rgb;

//	colFac.a *= .35;
	
	
//	colFac = vec4(1, 1, 1, 1);
//	colFac.a *= age;



	gl_FragColor = colFac;
     */

    
    //NOTE: Ollie testing
//    /*
    vec4 c = vec4(1.0);
    float alph = 0.5 - smoothstep(0.1, 0.5, distance(gl_TexCoord[0].xy, vec2(0.5, 0.1)));
    gl_FragColor = vec4(1.0, 1.0, 1.0, alph);
//     */
}
//*/

