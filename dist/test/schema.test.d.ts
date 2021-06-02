import * as TJS from "../typescript-json-schema";
interface AjvTestOptions {
    skipCompile: boolean;
    expectedWarnings: string[];
}
export declare function assertSchema(group: string, type: string, settings?: TJS.PartialArgs, compilerOptions?: TJS.CompilerOptions, only?: boolean, ajvOptions?: Partial<AjvTestOptions>, throws?: boolean): void;
export declare function assertSchemas(group: string, type: string, settings?: TJS.PartialArgs, compilerOptions?: TJS.CompilerOptions): void;
export declare function assertRejection(group: string, type: string, settings?: TJS.PartialArgs, compilerOptions?: TJS.CompilerOptions): void;
export {};
