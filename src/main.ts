import {RoleDto} from "./models/dto/role.dto";

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {TransformInterceptor} from "./helpers/transform.interceptor";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import {RoleService} from "./services/dao-impl/role.service";
import {SectorService} from "./services/dao-impl/sector.service";
import {CategoryService} from "./services/dao-impl/category.service";
import {OrderTypeEntity} from "./models/entities/order-type.entity";
import {OrderTypeService} from "./services/dao-impl/order-type.service";

async function bootstrap() {

  //Create nest module
  const app = await NestFactory.create(AppModule);

  //Use valid action pipe for all app request
  app.useGlobalPipes(new ValidationPipe());

  //Enable cors
  app.enableCors();

  //Use global interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  
  //Bootstrap swagger
  const swaggerConfig = new DocumentBuilder()
      .setTitle("Stock Control")
      .setDescription("Stock Control API")
      .setVersion("0.1")
      .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, doc);

  //Serve static files
  const storagePath = process.env.PATH_STORAGE as string;
  const accessUrl = process.env.SERVE_STATIC_IMAGE_URL;

  app.use(accessUrl, express.static(storagePath));

  //Init role
  const roleUser = new RoleDto();
  roleUser.name = "ROLE_USER";
  const roleAdmin = new RoleDto();
  roleAdmin.name = "ROLE_ADMIN";

  //Init Sector
  const dataSector = [
    {name: "Consumer electronics"},
    {name: "Fashion"},
    {name: "Beauty & Personal Care"},
    {name: "Home & kitchen"},
    {name: "Sports & Leisure"},
    {name: "Food and drink"},
    {name: "Babies and children"},
    {name: "Automotive"},
    {name: "Tools and home improvement"},
  ];

  const dateCategory = [
    {name: "Phone", code:"PHO", sector: { id : 1} },
    {name: "Computers", code:"COP", sector: { id : 1}},
    {name: "Televisions", code:"TVS", sector: { id : 1}},
    {name: "Cameras", code:"CAM", sector: { id : 1}},
    {name: "Clothing", code:"CLO", sector: { id : 2}},
    {name: "Shoes", code:"SHO", sector: { id : 2}},
    {name: "Accessories", code:"ACC", sector: { id : 2}},
    {name: "Jewelry", code:"JEW", sector: { id : 2}},
    {name: "Make-up", code:"MKU", sector: { id : 3}},
    {name: "Skincare", code:"SKI", sector: { id : 3}},
    {name: "Hair products", code:"HAP", sector: { id : 3}},
    {name: "Fragrances", code:"FRA", sector: { id : 3}},
    {name: "Furniture", code:"FUR", sector: { id : 4}},
    {name: "Kitchen utensils", code:"KIU", sector: { id : 4}},
    {name: "Interior decoration", code:"IND", sector: { id : 4}},
    {name: "Household appliances", code:"HOA", sector: { id : 4}},
    {name: "Ports equipment", code:"POE", sector: { id : 5}},
    {name: "Sportswear", code:"SPO", sector: { id : 5}},
    {name: "Outdoor items", code:"OUI", sector: { id : 5}},
    {name: "Games", code:"GAM", sector: { id : 5}},
    {name: "Food products", code:"FOP", sector: { id : 6}},
    {name: "Beverages", code:"BEV", sector: { id : 6}},
    {name: "Snacks", code:"SNA", sector: { id : 6}},
    {name: "Vitamins", code:"VIT", sector: { id : 7}},
    {name: "Natural health products", code:"NHP", sector: { id : 7}},
    {name: "Medical equipment", code:"MEE", sector: { id : 7}},
    {name: "Baby articles", code:"BAA", sector: { id : 8}},
    {name: "Toys", code:"TOY", sector: { id : 8}},
    {name: "Children's clothing", code:"CHC", sector: { id : 8}},
    {name: "Spare parts", code:"SPP", sector: { id : 9}},
    {name: "Accessories", code:"ACC", sector: { id : 9}},
    {name: "Automotive maintenance tools", code:"AMT", sector: { id : 9}},
    {name: "Tools", code:"TOO", sector: { id : 9}},
    {name: "Building materials", code:"BUM", sector: { id : 9}},
    {name: "Maintenance equipment", code:"MAE", sector: { id : 9}},
  ]

  const dataOrderType: any = [
    {type: "Purchase"},
    {type: "Sale"},
    {type: "Transfer"}
  ]

  const roleService = app.get(RoleService);
  if(await roleService.checkIfDataExist()){
    await roleService.createRole(roleUser);
    await roleService.createRole(roleAdmin);
  }

  const sectorService = app.get(SectorService);
  if(await sectorService.checkIfDataExist()){
    await sectorService.createSector(dataSector);
  }

  const catService = app.get(CategoryService);
  if(await catService.checkIfDataExist()){
    await catService.createCategory(dateCategory);
  }

  const orderTypeService = app.get(OrderTypeService);
  if(await orderTypeService.checkIfDataExist()){
    await orderTypeService.createOrderType(dataOrderType);
  }


  //Listen on port 3000
  await app.listen(3001);
}
bootstrap();
