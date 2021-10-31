#include <stdio.h>

int main(){
struct penis {
        int x;
        float y;
};

struct penis isInMyMouth;
isInMyMouth.x = 200;
isInMyMouth.y = 100.9999;
struct penis *isIn;
isIn = &isInMyMouth;
printf("shit x %d, y %f", isIn->x, isIn->y);
}