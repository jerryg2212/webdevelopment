#include<stdio.h>
int mult(int x, int y);
int main(){
    printf("This is the return form mult %d", mult(13,9000070));

}

int mult(int x, int y){
    return x * y;
}