import type { MetadataRoute } from 'next';
import {site,locales,paths} from '@/config/site';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{return locales.flatMap(locale=>paths.map(path=>({url:`${site.url}/${locale}${path?'/'+path:''}`,alternates:{languages:{ko:`${site.url}/ko${path?'/'+path:''}`,en:`${site.url}/en${path?'/'+path:''}`}}})));}
