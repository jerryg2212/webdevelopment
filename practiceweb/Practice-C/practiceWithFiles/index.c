#include <stdio.h>

#define array_length 30
int main(){
    char message[array_length];
    FILE *f_read = fopen("./index.txt", "rb");
    printf("this is the number placed into message %d ", fread(&message, sizeof(char), array_length, f_read));
    int i;
    //for (i = 0; i < sizeof message / sizeof message[0]; i++){
        printf("this is the character %s ", message);
    fclose(f_read);
    
}