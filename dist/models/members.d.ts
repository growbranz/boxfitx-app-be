import mongoose from "mongoose";
export declare const MemberModel: mongoose.Model<{
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
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
        email: string;
        fullName: string;
        medicalConditions: boolean;
        medicalConditionsDetails: string;
        onMedication: boolean;
        medicationDetails: string;
        previousInjuries: boolean;
        previousInjuriesDetails: string;
        underFitnessProgram: boolean;
        fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
        status: "active" | "expired" | "inactive";
        archived: boolean;
        number?: number | null;
        dob?: NativeDate | null;
        gender?: "Male" | "Female" | null;
        address?: string | null;
        emergencyContact?: {
            name?: string | null;
            phone?: number | null;
            relation?: string | null;
        } | null;
        heightCm?: number | null;
        weightCm?: number | null;
        membership?: {
            planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
            startDate?: NativeDate | null;
            expiryDate?: NativeDate | null;
            paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
        } | null;
        cardId?: string | null;
        reminders?: {
            day7Sent: boolean;
            day3Sent: boolean;
            day1Sent: boolean;
            lastReminderSentAt?: NativeDate | null;
        } | null;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
        email: string;
        fullName: string;
        medicalConditions: boolean;
        medicalConditionsDetails: string;
        onMedication: boolean;
        medicationDetails: string;
        previousInjuries: boolean;
        previousInjuriesDetails: string;
        underFitnessProgram: boolean;
        fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
        status: "active" | "expired" | "inactive";
        archived: boolean;
        number?: number | null;
        dob?: NativeDate | null;
        gender?: "Male" | "Female" | null;
        address?: string | null;
        emergencyContact?: {
            name?: string | null;
            phone?: number | null;
            relation?: string | null;
        } | null;
        heightCm?: number | null;
        weightCm?: number | null;
        membership?: {
            planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
            startDate?: NativeDate | null;
            expiryDate?: NativeDate | null;
            paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
        } | null;
        cardId?: string | null;
        reminders?: {
            day7Sent: boolean;
            day3Sent: boolean;
            day1Sent: boolean;
            lastReminderSentAt?: NativeDate | null;
        } | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    fullName: string;
    medicalConditions: boolean;
    medicalConditionsDetails: string;
    onMedication: boolean;
    medicationDetails: string;
    previousInjuries: boolean;
    previousInjuriesDetails: string;
    underFitnessProgram: boolean;
    fitnessGoal: "weight_loss" | "muscle_gain" | "general_fitness" | "strength_training" | "boxing_combat" | "others";
    status: "active" | "expired" | "inactive";
    archived: boolean;
    number?: number | null;
    dob?: NativeDate | null;
    gender?: "Male" | "Female" | null;
    address?: string | null;
    emergencyContact?: {
        name?: string | null;
        phone?: number | null;
        relation?: string | null;
    } | null;
    heightCm?: number | null;
    weightCm?: number | null;
    membership?: {
        planType?: "monthly" | "quarterly" | "half_yearly" | "annual" | null;
        startDate?: NativeDate | null;
        expiryDate?: NativeDate | null;
        paymentMode?: "cash" | "card" | "Upi" | "Online_transfer" | null;
    } | null;
    cardId?: string | null;
    reminders?: {
        day7Sent: boolean;
        day3Sent: boolean;
        day1Sent: boolean;
        lastReminderSentAt?: NativeDate | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=members.d.ts.map