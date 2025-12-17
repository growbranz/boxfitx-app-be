import mongoose from "mongoose";
export declare const AttendanceModel: mongoose.Model<{
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        member: mongoose.Types.ObjectId;
        source: "biometric" | "manual";
        date?: string | null;
        cardId?: string | null;
        checkIn?: NativeDate | null;
        checkOut?: NativeDate | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        member: mongoose.Types.ObjectId;
        source: "biometric" | "manual";
        date?: string | null;
        cardId?: string | null;
        checkIn?: NativeDate | null;
        checkOut?: NativeDate | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    member: mongoose.Types.ObjectId;
    source: "biometric" | "manual";
    date?: string | null;
    cardId?: string | null;
    checkIn?: NativeDate | null;
    checkOut?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=attendance.d.ts.map