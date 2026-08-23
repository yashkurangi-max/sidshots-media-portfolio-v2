Deployment investigation (2026-08-23):
- GitHub branch URL: https://github.com/yashkurangi-max/sidshots-media-portfolio-v2/tree/apurwa
- The public GitHub page reported the apurwa branch at commit 6ccfcd2 and 4 commits behind main when inspected.
- Repository Vercel URL listed by GitHub: https://sidshots-media-portfolio-v2.vercel.app
- Manus preview URL: https://3000-i5ikctyip0g88fqun7w8z-04f12d21.us3.manus.computer
- The deployed branch needs a direct public-site video probe because the local Manus preview can resolve /manus-storage URLs while an external Vercel deployment may not.

Post-push verification (2026-08-23): After the apurwa branch was updated to commit 4b6b5b78, the public Vercel endpoint https://sidshots-media-portfolio-v2.vercel.app/assets/FinalSlide-web.mp4 returned HTTP 200 with content-type video/mp4 and 446,313 bytes. The public Vercel page at https://sidshots-media-portfolio-v2.vercel.app/#reel loaded the Frames in motion section. The raw apurwa source references /assets/FinalSlide-web.mp4, and the raw GitHub asset is present.
