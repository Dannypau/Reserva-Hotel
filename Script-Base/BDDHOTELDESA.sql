/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     28/1/2017 15:08:12                           */
/*==============================================================*/


drop index RESERVA_HABITACION_FK;

drop index HABITACION_TIPO_FK;

drop index HABITACION_PK;

drop table HABITACION;

drop index HUESPED_HABITACION_FK;

drop index HUESPED_PK;

drop table HUESPED;

drop index RESERVA_SERVICIO_FK;

drop index USUARIO_RESERVA_FK;

drop index RESERVA_PK;

drop table RESERVA;

drop index SERVICIO_PK;

drop table SERVICIO;

drop index TIPO_HABITACION_PK;

drop table TIPO_HABITACION;

drop index USUARIO_PK;

drop table USUARIO;

/*==============================================================*/
/* Table: HABITACION                                            */
/*==============================================================*/
create table HABITACION (
   ID_HABITACION        INT4                 not null,
   ID_TIPO_HABITACION   INT4                 not null,
   ID_RESERVA           INT4                 null,
   DISPONIBILIDAD       BOOL                 not null,
   NUMERO_PISO          INT4                 not null,
   constraint PK_HABITACION primary key (ID_HABITACION)
);

/*==============================================================*/
/* Index: HABITACION_PK                                         */
/*==============================================================*/
create unique index HABITACION_PK on HABITACION (
ID_HABITACION
);

/*==============================================================*/
/* Index: HABITACION_TIPO_FK                                    */
/*==============================================================*/
create  index HABITACION_TIPO_FK on HABITACION (
ID_TIPO_HABITACION
);

/*==============================================================*/
/* Index: RESERVA_HABITACION_FK                                 */
/*==============================================================*/
create  index RESERVA_HABITACION_FK on HABITACION (
ID_RESERVA
);

/*==============================================================*/
/* Table: HUESPED                                               */
/*==============================================================*/
create table HUESPED (
   ID_HUESPED           VARCHAR(10)          not null,
   ID_HABITACION        INT4                 not null,
   NOMBRE_HUESPED       VARCHAR(100)         not null,
   constraint PK_HUESPED primary key (ID_HUESPED)
);

/*==============================================================*/
/* Index: HUESPED_PK                                            */
/*==============================================================*/
create unique index HUESPED_PK on HUESPED (
ID_HUESPED
);

/*==============================================================*/
/* Index: HUESPED_HABITACION_FK                                 */
/*==============================================================*/
create  index HUESPED_HABITACION_FK on HUESPED (
ID_HABITACION
);

/*==============================================================*/
/* Table: RESERVA                                               */
/*==============================================================*/
create table RESERVA (
   ID_RESERVA           INT4                 not null,
   ID_USUARIO           VARCHAR(10)          not null,
   ID_SERVICIO          INT4                 not null,
   FECHA_INICIO         DATE                 not null,
   FECHA_FIN            DATE                 not null,
   COSTO_TOTAL          MONEY                not null,
   NUMERO_PERSONAS      INT4                 not null,
   constraint PK_RESERVA primary key (ID_RESERVA)
);

/*==============================================================*/
/* Index: RESERVA_PK                                            */
/*==============================================================*/
create unique index RESERVA_PK on RESERVA (
ID_RESERVA
);

/*==============================================================*/
/* Index: USUARIO_RESERVA_FK                                    */
/*==============================================================*/
create  index USUARIO_RESERVA_FK on RESERVA (
ID_USUARIO
);

/*==============================================================*/
/* Index: RESERVA_SERVICIO_FK                                   */
/*==============================================================*/
create  index RESERVA_SERVICIO_FK on RESERVA (
ID_SERVICIO
);

/*==============================================================*/
/* Table: SERVICIO                                              */
/*==============================================================*/
create table SERVICIO (
   ID_SERVICIO          INT4                 not null,
   DESAYUNO             BOOL                 not null,
   PARQUEADERO          BOOL                 not null,
   constraint PK_SERVICIO primary key (ID_SERVICIO)
);

/*==============================================================*/
/* Index: SERVICIO_PK                                           */
/*==============================================================*/
create unique index SERVICIO_PK on SERVICIO (
ID_SERVICIO
);

/*==============================================================*/
/* Table: TIPO_HABITACION                                       */
/*==============================================================*/
create table TIPO_HABITACION (
   ID_TIPO_HABITACION   INT4                 not null,
   VISTA_MAR            BOOL                 not null,
   JACUZZI              BOOL                 not null,
   NUMERO_CAMAS         INT4                 not null,
   COSTO                MONEY                not null,
   constraint PK_TIPO_HABITACION primary key (ID_TIPO_HABITACION)
);

/*==============================================================*/
/* Index: TIPO_HABITACION_PK                                    */
/*==============================================================*/
create unique index TIPO_HABITACION_PK on TIPO_HABITACION (
ID_TIPO_HABITACION
);

/*==============================================================*/
/* Table: USUARIO                                               */
/*==============================================================*/
create table USUARIO (
   ID_USUARIO           VARCHAR(10)          not null,
   NOMBRE_USUARIO       VARCHAR(100)         not null,
   CORREO               VARCHAR(50)          null,
   DIRECCION            VARCHAR(100)         null,
   TELEFONO             VARCHAR(13)          null,
   constraint PK_USUARIO primary key (ID_USUARIO)
);

/*==============================================================*/
/* Index: USUARIO_PK                                            */
/*==============================================================*/
create unique index USUARIO_PK on USUARIO (
ID_USUARIO
);

alter table HABITACION
   add constraint FK_HABITACI_HABITACIO_TIPO_HAB foreign key (ID_TIPO_HABITACION)
      references TIPO_HABITACION (ID_TIPO_HABITACION)
      on delete restrict on update restrict;

alter table HABITACION
   add constraint FK_HABITACI_RESERVA_H_RESERVA foreign key (ID_RESERVA)
      references RESERVA (ID_RESERVA)
      on delete restrict on update restrict;

alter table HUESPED
   add constraint FK_HUESPED_HUESPED_H_HABITACI foreign key (ID_HABITACION)
      references HABITACION (ID_HABITACION)
      on delete restrict on update restrict;

alter table RESERVA
   add constraint FK_RESERVA_RESERVA_S_SERVICIO foreign key (ID_SERVICIO)
      references SERVICIO (ID_SERVICIO)
      on delete restrict on update restrict;

alter table RESERVA
   add constraint FK_RESERVA_USUARIO_R_USUARIO foreign key (ID_USUARIO)
      references USUARIO (ID_USUARIO)
      on delete restrict on update restrict;

