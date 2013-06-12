
#pragma once

#include "cinder/Vector.h"
#include "VectorSet.h"
#include <vector>

class CloudController {
public:
	CloudController();
	CloudController(ci::Vec2f, float, float, VectorSet*);

	void setColor(ci::Vec3f);

	void update();
	void draw();

	void applyForce(ci::Vec2f);
	//void follow();
    
    void checkRespawn();

	VectorSet* mParticleController;

	//CloudParticle* mCloudParticle;

	bool state;

	ci::Vec2f mLoc;
	ci::Vec2f mVel;
	ci::Vec2f mAcc;
	ci::Vec2f mDesired;

	ci::Vec3f mCol;
	
	float mMaxForce;
	float mMaxSpeed;
	float mRadius;
    float mPrevTime;
};


