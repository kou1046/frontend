import axios from "axios";

export interface Group {
    name : string;
  }
  
export interface Frame {
    frame : number;
    img_path : string;
    img : string;
    group : Group;
    people : Array<Person>;
  }

export interface Person {
    id: string;
    keypoints : Keypoints;
    box : BoundingBox;
}

export interface Person2 {
    id: string; 
    frameNum: number;
    group: string;
    box: BoundingBox;
}

export interface Keypoints {
    nose: Point;
    neck: Point; 
    r_shoulder: Point;
    r_elbow: Point; 
    r_wrist: Point; 
    l_shoulder: Point;
    l_elbow: Point; 
    l_wrist: Point; 
    midhip: Point; 
    r_hip: Point; 
    r_knee: Point;
    r_ankle: Point; 
    l_hip: Point; 
    l_knee: Point;
    l_ankle: Point; 
    r_eye: Point; 
    l_eye: Point; 
    r_ear: Point; 
    l_ear: Point; 
    l_bigtoe: Point;
    l_smalltoe: Point;
    l_heel: Point; 
    r_bigtoe: Point;
    r_smalltoe: Point;
    r_hell: Point; 
}

export interface BoundingBox {
    id: number;
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

export interface Point { 
    x: number;
    y: number;
    p: number;
}

export interface ITeacher {
    person: string,
    label: number;
}

export interface ITeacher2 {
    person: Person2, 
    label: number
}

export interface PageNationTeacher {
    count:number;
    next:string | null;
    previous:string | null;
    results:Array<ITeacher2>;
}