/*
SELECT "store_product"."id" AS "store_product_id", 
"store_product"."createdAt" AS "store_product_createdAt", 
"store_product"."updatedAt" AS "store_product_updatedAt", 
"store_product"."storeId" AS "store_product_storeId", 
"store_product"."productId" AS "store_product_productId", 
"store_product"."storeStock" AS "store_product_storeStock",
"product"."id" AS "product_id", 
"product"."createdAt" AS "product_createdAt", 
"product"."updatedAt" AS "product_updatedAt", 
"product"."price" AS "product_price", 
"product"."productName" AS "product_productName", 
"product"."categoryId" AS "product_categoryId", 
"product"."totalStock" AS "product_totalStock", 
"product"."description" AS "product_description", 
"product"."imgUrl" AS "product_imgUrl" 
FROM "store_product" "store_product" 
LEFT JOIN "product" "product" ON "product"."id"="store_product"."productId" 
WHERE storeId = $1 AND productId = $2

PARAMETER = [14, 1]
*/
