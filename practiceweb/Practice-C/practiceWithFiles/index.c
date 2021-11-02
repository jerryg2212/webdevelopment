#include <stdio.h>

#define array_length 30
int main(){
    char message[array_length];
    FILE *f_read = fopen("./index.txt", "r");
    fscanf(f_read, "%s", &message [0]);
    fclose(f_read);
    int i;
    for (i = 0; i < sizeof message / sizeof message[0]; i++){
        printf("this is the %d character %c ", i, message[i]);
    }
    
}