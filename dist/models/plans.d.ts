import mongoose from "mongoose";
export declare const PlanModel: mongoose.Model<{
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
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
        isActive: boolean;
        planName: string;
        type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        duration?: number | null;
        price?: number | null;
        benefits?: string | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        isActive: boolean;
        planName: string;
        type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        duration?: number | null;
        price?: number | null;
        benefits?: string | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    isActive: boolean;
    planName: string;
    type?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
    duration?: number | null;
    price?: number | null;
    benefits?: string | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=plans.d.ts.map