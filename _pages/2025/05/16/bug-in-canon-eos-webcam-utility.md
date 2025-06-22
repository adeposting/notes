---
title: Bug In Canon Eos Webcam Utility
date: 2025-05-16
categories:
    - /macos
    - /troubleshooting
tags: 
    - macos
    - software-bug
    - canon-cameras
---

[Canon's EOS Webcam Utility Pro](https://www.usa.canon.com/cameras/eos-webcam-utility) is a piece of crap software required to use various Canon cameras as webcams.

One day, I noticed my CPU temperature was above 100 C.

That's a problem.

I did some investigating and found that the Canon's EOS Webcam Utility Pro service was maxing out my CPU. My camera wasn't plugged in. I wasn't using the software. I didn't even think it was running in the background. What the fuck.

So I killed the process, and launchd immediately restarted it. The little bastard wouldn't die.

So I unloaded it with `launchd` so it would stop restarting, using

```sh
launchctl unload /Library/LaunchAgents/com.canon.usa.EWCService.plist
```

That worked. It killed the bugger and my CPU temperature dropped by 50C in a few minutes. 

I'm going to monitor it for a bit and see if it comes back on reboot. I haven't done a deep dive or root cause as to why yet, because I'm kind of busy with other crap. Anyway, if it does come back, my plan for now is to just keep running the above command.

I'm using [Hot](https://github.com/macmade/Hot) to put a temperature monitor in my menu bar so I can keep an eye on things.

---

## See Also

- [Category: /macos](/notes-by-category#category-/macos)