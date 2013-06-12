#extension GL_EXT_gpu_shader4: enable

uniform sampler2D positions;
uniform sampler2D velocities;
uniform sampler2D information;
uniform sampler2D oVelocities;
uniform sampler2D oPositions;
uniform sampler2D noiseTex;

varying vec4 texCoord;

float tStep = 0.01;
float M_PI = 3.1415926535897932384626433832795;

uniform vec2 mousePos;

uniform vec2 finger1;
uniform vec2 finger2;
uniform vec2 finger3;
uniform vec2 finger4;
uniform vec2 finger5;

uniform int maxControllers;
//uniform vec2[] controllers;

uniform vec2 controller1;
uniform vec2 controller2;
uniform vec2 controller3;
uniform vec2 controller4;

uniform int checkUserInput;

//Leap scaling
uniform float scaleX;
uniform float scaleY;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}


void main(){
	vec3 pos = texture2D( positions, texCoord.st).rgb;
	
	float mass = texture2D( positions, texCoord.st).a;

	vec3 vel = texture2D( velocities, texCoord.st).rgb;
	float decay = texture2D( velocities, texCoord.st).a;

	float age = texture2D( information, texCoord.st).r;
	float maxAge = texture2D( information, texCoord.st).g;

	vec2 noise = texture2D( noiseTex, pos.xy).rg;
	vec3 origPos = texture2D(oPositions, texCoord.st).rgb;
	
	//if(noise.x < 0.0){
	//	noise.x *= -1;
	//}
	vel += vec3(noise.x*15.0,noise.y*15.0,sin(10.0));
	
	
	//Life/death cycle
	age += tStep;
	if( age >= maxAge ){
		vec3 origVel = texture2D(oVelocities, texCoord.st).rgb;
		age = 0.0;
		
		if(pos.x > 1.0 || pos.x < 0.0 || pos.y > 1.0 || pos.y < 0.0 ){
			pos = origPos;
		}
		vel = origVel;
	}
    
    
    //Particle interaction
	if(checkUserInput == -1){
		/*float x = (controller1.x - (scaleX*pos.x)) * (controller1.x - (scaleX*pos.x));
		float y = (controller1.y - (scaleY*pos.y)) * (controller1.y - (scaleY*pos.y));
		if( x+y < 50.0){
			vel.x = -vel.x;
		}
		
		float x2 = (controller2.x - (scaleX*pos.x)) * (controller2.x - (scaleX*pos.x));
		float y2 = (controller2.y - (scaleY*pos.y)) * (controller2.y - (scaleY*pos.y));
		if( x2+y2 < 50.0){
			vel.x = -vel.x;
		}
		
		
		float x3 = (controller3.x - (scaleX*pos.x)) * (controller3.x - (scaleX*pos.x));
		float y3 = (controller3.y - (scaleY*pos.y)) * (controller3.y - (scaleY*pos.y));
		if( x3+y3 < 50.0){
			vel.x = -vel.x;
		}
		
		float x4 = (controller4.x - (scaleX*pos.x)) * (controller4.x - (scaleX*pos.x));
		float y4 = (controller4.y - (scaleY*pos.y)) * (controller4.y - (scaleY*pos.y));
		if( x4+y4 < 50.0){
			vel.x = -vel.x;
		}*/
	}
///*
	if(checkUserInput >= 1){
		float x = (finger1.x - (scaleX*pos.x)) * (finger1.x - (scaleX*pos.x));  //NOTE: do in main app - if fingers not active set to 0, then multiply by that... AVOID BRANCHING!!
		float y = (finger1.y - (scaleY*pos.y)) * (finger1.y - (scaleY*pos.y));
		if( x+y < 50.0){
			vel.x = -vel.x;
		}
	}
	if(checkUserInput >= 2){
		float x = (finger2.x - (scaleX*pos.x)) * (finger2.x - (scaleX*pos.x));
		float y = (finger2.y - (scaleY*pos.y)) * (finger2.y - (scaleY*pos.y));
		if( x+y < 50.0){
			vel.x = -vel.x;
		}
	}
	if(checkUserInput >= 3){
		float x = (finger3.x - (scaleX*pos.x)) * (finger3.x - (scaleX*pos.x));
		float y = (finger3.y - (scaleY*pos.y)) * (finger3.y - (scaleY*pos.y));
		if( x+y < 50.0){
			vel.x = -vel.x;
		}
	}
	if(checkUserInput >= 4){
		float x = (finger4.x - (scaleX*pos.x)) * (finger4.x - (scaleX*pos.x));
		float y = (finger4.y - (scaleY*pos.y)) * (finger4.y - (scaleY*pos.y));
		if( x+y < 50.0){
			vel.x = -vel.x;
		}
	}
	if(checkUserInput >= 5){
		float x = (finger5.x - (scaleX*pos.x)) * (finger5.x - (scaleX*pos.x));
		float y = (finger5.y - (scaleY*pos.y)) * (finger5.y - (scaleY*pos.y));
		if( x+y < 50.0){
			vel.x = -vel.x;
		}
	}
//    */
	
	/*
	for(int i = 0; i < maxControllers; i++){
				pos.x =  (0.25) - origPos.x + controller1.x;
		pos.y = (0.25) - origPos.y + controller1.y;
		
		
		//Add variation 
		float thresh = 0.65; 
		vec2 dirVal = vec2(pos.x - controller1.x, pos.y - controller1.y);
		float distSqrd = length(dirVal) * length(dirVal);
		float percent = distSqrd/0.25;
        float threshDelta = 1.0f - thresh; 
		float adjustedPercent = ( percent - thresh )/threshDelta;
        float F = ( 1.0 - ( cos( adjustedPercent * M_PI*2.0) * -0.5f + 0.5f ) ) * 0.04f;
        dirVal = normalize(dirVal) * F;
        pos.x += dirVal.x;
		pos.y += dirVal.y;
	}
	*/
	//Line up the particles with their controllers
	if(origPos.x < 0.5 && origPos.y < 0.5){
		//Squares the particles
		
        //pos.x =  (0.25) - origPos.x + controller1.x;
		//pos.y = (0.25) - origPos.y + controller1.y;

		float theta = rand(origPos.xy)*M_PI*2.0;

        float amt = max(.25-abs(.25-origPos.x), .25-abs(.25-origPos.y));//(maxAmt*2.0) - distance(vec2(0.25, 0.25) , origPos.xy);
        amt *= 0.5;//cloud size
        
        pos.x =   cos(theta)*(-amt)*2.0 + controller1.x;
		pos.y =  - sin(theta)*(-amt) + controller1.y;
        
		
		//Add variation 
		float thresh = 0.25;
		vec2 dirVal = vec2(pos.x - controller1.x, pos.y - controller1.y);
		float distSqrd = length(dirVal) * length(dirVal);
		float percent = distSqrd/0.25;
        float threshDelta = 1.0 - thresh;
		float adjustedPercent = ( percent - thresh )/threshDelta;
        
        
        //float F = ( 0.5 - ( cos( adjustedPercent * M_PI*3.0) * -0.2 + 6.5 ) ) * 0.02; //NOTE: original
        
        //NOTE: generating a new algorythm
//        float F = 
        
        
        //dirVal = normalize(dirVal) * F;
        //pos.x += dirVal.x;
		//pos.y += dirVal.y;
	}
//	/*
	if(origPos.x >= 0.5 && origPos.y < 0.5){
		pos.x = origPos.x + controller2.x;// + vel.x; // * noise.x;
		pos.y = origPos.y + controller2.y;// + vel.y; // * noise.y;
	}
	
	if(origPos.x < 0.5 && origPos.y >= 0.5){
		pos.x = origPos.x + controller3.x;// + vel.x;; // * noise.x;
		pos.y = origPos.y + controller3.y;// + vel.y; // * noise.y;
	}
	
	if(origPos.x >= 0.5 && origPos.y >= 0.5){
		pos.x = origPos.x + controller4.x;// + vel.x;; //* noise.x;
		pos.y = origPos.y + controller4.y;// + vel.y; // noise.y;
	}
//	*/
	
    
	//Add noise to the particles
	pos.x += (vel.x);
	pos.y += (vel.y);
	
	
	
	//position + mass
	gl_FragData[0] = vec4(pos, mass);

	//velocity + decay
	gl_FragData[1] = vec4(vel, decay);

	//age information
	gl_FragData[2] = vec4(age, maxAge, 0.0, 1.0);
}
