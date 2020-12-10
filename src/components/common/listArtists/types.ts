import { FlattenSimpleInterpolation } from "styled-components";
import { Artist } from "../../../common/api/webapi/types";

export interface ListArtistsProps{
    artists: Artist[]   
    additionalCSS?: string | FlattenSimpleInterpolation
}