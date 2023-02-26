import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";

export class SwaggerDocumentation{

    constructor(app){
        const config = new DocumentBuilder()
        .setTitle('Google Bank Api')
        .setDescription('The new google bank, easy to signup')
        .setVersion('1.0')
        .build();
        
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);
    }


}