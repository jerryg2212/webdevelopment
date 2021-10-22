#include<stdio.h>
#include<process.h>

int main(int argc, char *argv[]){
    int x = 100;
    printf("%d",x);
    int rc = fork();
    printf("%d",rc);
    printf("%d", x);
}