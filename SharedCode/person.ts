import { Assignment, Trillium, IPPS, Position } from "./types";

class Person {
    id: string;
    ein: string;
    email: string;
    pal: string;

    name: string;
    first_name: string;
    last_name: string;
    sortable_name: string;

    people_set_memberships: Array<string>;

    school_codes: Array<string>;
    location_codes: Array<string>;

    trillium: Trillium;

    ipps: IPPS;
}