
/****** Object:  Table "public"."TestCrudForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestCrudForSqlserver"(
	"id" varchar(50) NOT NULL,
	"name" varchar(50) NULL,
	"title" varchar(50) NULL,
	"count" integer NULL,
 CONSTRAINT "PK_TestCrudForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestCrudForSqlserver"
    OWNER to postgres;


/****** Object:  Table "public"."TestFieldsForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestFieldsForSqlserver"(
	"id" varchar(50) NOT NULL,
	"name" varchar(50) NULL,
	"title" varchar(50) NULL,
	"tag" varchar(50) NULL,
 CONSTRAINT "PK_TestFieldsForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestFieldsForSqlserver"
    OWNER to postgres;


/****** Object:  Table "public"."TestFieldTypesForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestFieldTypesForSqlserver"(
	"id" serial NOT NULL,
	"text" varchar(50) NULL,
	"textarea" varchar(50) NULL,
	"int" integer NULL,
	"float" double precision NULL,
	"date" date NULL,
	"datetime" timestamp(4) without time zone NULL,
	"bool" boolean NULL,
 CONSTRAINT "PK_TestFieldTypesForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestFieldTypesForSqlserver"
    OWNER to postgres;


/****** Object:  Table "public"."TestFiltersForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestFiltersForSqlserver"(
	"id" varchar(50) NOT NULL,
	"name" varchar(50) NULL,
	"title" varchar(50) NULL,
	"count" integer NULL,
 CONSTRAINT "PK_TestFiltersForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestFiltersForSqlserver"
    OWNER to postgres;


/****** Object:  Table "public"."TestPageForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestPageForSqlserver"(
	"id" varchar(50) NOT NULL,
	"name" varchar(50) NULL,
	"title" varchar(50) NULL,
	"index" integer NULL,
 CONSTRAINT "PK_TestPageForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestPageForSqlserver"
    OWNER to postgres;


/****** Object:  Table "public"."TestPrimaryKeyForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestPrimaryKeyForSqlserver"(
	"id" serial NOT NULL,
	"name" varchar(50) NULL,
	"title" varchar(50) NULL,
	"count" integer NULL,
 CONSTRAINT "PK_TestPrimaryKeyForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestPrimaryKeyForSqlserver"
    OWNER to postgres;


/****** Object:  Table "public"."TestSortForSqlserver"    Script Date: 2019/4/24 18:22:13 ******/
CREATE TABLE "public"."TestSortForSqlserver"(
	"id" varchar(50) NOT NULL,
	"name" varchar(50) NULL,
	"title" varchar(50) NULL,
	"count" integer NULL,
 CONSTRAINT "PK_TestSortForSqlserver" PRIMARY KEY ("id") 
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE "public"."TestSortForSqlserver"
    OWNER to postgres;


