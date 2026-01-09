import mongoose from "mongoose";
export declare const NoticeModel: mongoose.Model<{
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
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
        priority: "high" | "low" | "medium";
        title: string;
        visible: boolean;
        description?: string | null;
        expiryDate?: NativeDate | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        priority: "high" | "low" | "medium";
        title: string;
        visible: boolean;
        description?: string | null;
        expiryDate?: NativeDate | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    priority: "high" | "low" | "medium";
    title: string;
    visible: boolean;
    description?: string | null;
    expiryDate?: NativeDate | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=notices.d.ts.map