import axios from "axios";

export interface Group {
    name : string;
  }
  
export interface Frame {
    id: string;
    frame : number;
    group : Group;
    people : Array<Person | string>;
    device: Device | string;
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
    person: string;
    label: number;
}

export interface ITeacher2 {
    person: Person2; 
    label: number
}

export interface MousePos {
    x: number; 
    y: number; 
    time: string; 
    frame: string; 
}

export interface MouseClick {
    time: string; 
    x: number;
    y: number; 
    frame: string; 
}

export interface MouseRelease {
    x: number; 
    y: number; 
    time: string; 
    frame: string; 
}

export interface Device {
    mousePos: MousePos | string;
    mouseClick: MouseClick | string; 
    mouseRelease: MouseRelease | string; 
    group: Group | string;
    id: string;
}

export interface PageNationContents<T> {
    count: number; 
    next: string | null; 
    previous: string | null; 
    results: Array<T>
}