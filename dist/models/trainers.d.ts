import mongoose from "mongoose";
export declare const TrainerModel: mongoose.Model<{
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
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
        fullName: string;
        status: "active" | "inactive";
        archived: boolean;
        speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
        experienceYears: number;
        email?: string | null;
        phone?: string | null;
        salary?: number | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        fullName: string;
        status: "active" | "inactive";
        archived: boolean;
        speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
        experienceYears: number;
        email?: string | null;
        phone?: string | null;
        salary?: number | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    fullName: string;
    status: "active" | "inactive";
    archived: boolean;
    speciality: "weight_loss" | "general_fitness" | "strength_training" | "boxing" | "crossfit" | "yoga";
    experienceYears: number;
    email?: string | null;
    phone?: string | null;
    salary?: number | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=trainers.d.ts.map