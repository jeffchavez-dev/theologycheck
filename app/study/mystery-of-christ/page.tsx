'use client'
import { useState, useEffect } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const outlineData = {"chapters":[{"chapterNumber":0,"title":"Preface","sections":[{"level":1,"heading":"Preface","bibleReferences":[],"subsections":[]}]},{"chapterNumber":1,"title":"Chapter 1: Biblical Theology and Systematic Theology in Covenant Theology","sections":[{"level":2,"heading":"Introduction","bibleReferences":["Romans 11:33","Romans 11:36","Proverbs 24:27"],"subsections":[]},{"level":2,"heading":"1. Scope and Simplicity","bibleReferences":[],"subsections":[]},{"level":2,"heading":"2. Creation, Covenant, and Consequences","bibleReferences":["Luke 17:10","Acts 17:24–25","Job 35:5–8","Job 41:11","Romans 2:14–15","Hebrews 9:10","1 Corinthians 7:19","Philippians 4:8–9","Romans 4:11"],"subsections":[]},{"level":2,"heading":"3. The Law and the Gospel","bibleReferences":["Romans 11:6","Ephesians 2:8","Galatians 3:2","Genesis 3:15"],"subsections":[]},{"level":2,"heading":"4. History and Mystery","bibleReferences":["Ephesians 3:4","Colossians 4:3","Colossians 1:25","Colossians 1:25–27","Ephesians 3:4–12","Romans 16:25–26","Ephesians 1:9–10","Acts 1:6","Colossians 4:3–4","Luke 24:25–27","Acts 28:23"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Romans 11:33–36"],"subsections":[]}]},{"chapterNumber":2,"title":"Chapter 2: Typology","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. What is Typology?","bibleReferences":[],"subsections":[]},{"level":2,"heading":"2. The Relation between a Type and its Antitype","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Types reveal something greater, and other, than themselves.","bibleReferences":["John 6:32–33","1 Corinthians 10:4","Colossians 2:17","Hebrews 8:5","Hebrews 9:23–24","Hebrews 10:1"],"subsections":[]},{"level":2,"heading":"b. Types function on two levels.","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. Types terminate in their antitypes.","bibleReferences":[],"subsections":[]},{"level":2,"heading":"d. Types are positive and negative.","bibleReferences":["Jeremiah 31:31–32","Hebrews 10:1"],"subsections":[]},{"level":2,"heading":"3. The Application of Typological Principles","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":3,"title":"Chapter 3: Covenant and Kingdom","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The definition of a covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"b. Covenant sanctions","bibleReferences":["Jeremiah 34:18–20","Psalm 50:5","1 Samuel 20:12–16","1 Samuel 20:16","Genesis 15:9–10","Hebrews 9:16–17"],"subsections":[]},{"level":2,"heading":"c. The matter and form of a covenant","bibleReferences":["Romans 11:6","Romans 4:4–5","Galatians 3:18","Genesis 17:14","Exodus 24:7–8"],"subsections":[]},{"level":2,"heading":"d. Federal headship","bibleReferences":["Hebrews 7:9–10","Matthew 3:9"],"subsections":[]},{"level":2,"heading":"2. What is a Covenant's Function?","bibleReferences":["Psalm 24:1–2","Psalm 33:13–15","Daniel 4:34–35","Ephesians 1:9–10"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":4,"title":"Chapter 4: The Covenant of Works","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. Man's Created Condition","bibleReferences":["Genesis 1:31"],"subsections":[]},{"level":2,"heading":"2. Man's Covenantal Condition","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. God placed Adam in the garden of Eden","bibleReferences":["Genesis 2:8","Genesis 2:9","Genesis 2:15","Hebrews 12:22","Exodus 25:31–39"],"subsections":[]},{"level":2,"heading":"b. God appointed Adam federal head over his natural offspring","bibleReferences":["Romans 5:19","1 Corinthians 15:22","Genesis 1:28"],"subsections":[]},{"level":2,"heading":"c. God obligated Adam to a law of obedience","bibleReferences":["Genesis 2:15","Genesis 2:16–17","Numbers 3:5–10"],"subsections":[]},{"level":2,"heading":"d. God promised eternal life to Adam","bibleReferences":["Revelation 2:7","Genesis 3:22–24","Romans 3:23","Hebrews 2:10"],"subsections":[]},{"level":2,"heading":"e. God threatened Adam with sanctions","bibleReferences":["Genesis 2:17"],"subsections":[]},{"level":2,"heading":"f. God made a Covenant of Works with Adam","bibleReferences":[],"subsections":[]},{"level":2,"heading":"g. God tested Adam's obedience","bibleReferences":["Romans 3:23","Romans 5:17–18"],"subsections":[]},{"level":2,"heading":"3. Man's Cursed Condition","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Death","bibleReferences":["Romans 5:12","1 Corinthians 15:21–22","Ephesians 2:1–3","Ephesians 4:18","1 Corinthians 2:14","Matthew 7:17–18","Romans 5:6","Titus 3:3","Genesis 3:22"],"subsections":[]},{"level":2,"heading":"b. The abrogation of the covenant of works","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. A merciful curse","bibleReferences":["Genesis 3:15"],"subsections":[]},{"level":2,"heading":"4. The Protological Nature of the Kingdom","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":5,"title":"Chapter 5: The Noahic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. A New Creation and Commission","bibleReferences":["Genesis 8:21","Genesis 9:1–2"],"subsections":[]},{"level":2,"heading":"2. A Judicial Retribution","bibleReferences":["Genesis 9:5–7"],"subsections":[]},{"level":2,"heading":"3. A Promised Preservation","bibleReferences":["Genesis 9:8–17","Genesis 8:22"],"subsections":[]},{"level":2,"heading":"4. A Common Cursed Kingdom of Common Grace","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":6,"title":"Chapter 6: The Abrahamic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Initiation of the Covenant","bibleReferences":["Genesis 12:1–7"],"subsections":[]},{"level":2,"heading":"a. The federal head","bibleReferences":["Genesis 12:2"],"subsections":[]},{"level":2,"heading":"b. The inheritance of Canaan","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. The blessing for the nations","bibleReferences":["Ephesians 1:10"],"subsections":[]},{"level":2,"heading":"2. The Confirmation of the Covenant","bibleReferences":["Genesis 15:18"],"subsections":[]},{"level":2,"heading":"3. The Expansion of the Covenant","bibleReferences":["Genesis 15:18","Genesis 12:7","Genesis 17:4–8","Genesis 17:6","Genesis 35:11","Genesis 49:8–10","Genesis 17:9","Genesis 17:14"],"subsections":[]},{"level":2,"heading":"4. The Realization of the Covenant","bibleReferences":["Joshua 21:43–45","Nehemiah 9:7–8","1 Kings 4:20","Hebrews 11:12","Luke 1:54–55","Luke 1:68"],"subsections":[]},{"level":2,"heading":"5. The Foundation of the Old Covenant","bibleReferences":["Genesis 28:4","Genesis 35:12","Exodus 6:2–4","Exodus 32:13","Deuteronomy 1:8","Joshua 1:6","Psalm 105:6–11","Jeremiah 11:2–5","Romans 11:1","Acts 3:25–26","Acts 7:2–3","Luke 3:8–9"],"subsections":[]},{"level":2,"heading":"a. The Abrahamic Covenant anticipates the Mosaic Covenant","bibleReferences":["Genesis 15:13"],"subsections":[]},{"level":2,"heading":"b. The Abrahamic covenant anticipates the Davidic Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. The Abrahamic Covenant anticipates the New Covenant","bibleReferences":["Romans 4:10","Hebrews 11:9–10"],"subsections":[]},{"level":2,"heading":"d. The Abrahamic covenant echoes Eden","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":7,"title":"Chapter 7: The Mosaic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The promise of oppression and affliction","bibleReferences":["Genesis 15:13–16","Exodus 2:23–25","Exodus 12:40–41"],"subsections":[]},{"level":2,"heading":"b. The promise of liberation and fulfilment","bibleReferences":["Exodus 3:13–17","Exodus 6:1–5","Psalm 77:20"],"subsections":[]},{"level":2,"heading":"2. The Kind of Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Its laws","bibleReferences":["Exodus 19:3–8","Exodus 24:3–8","Hebrews 9:18–23","Exodus 34:27–28"],"subsections":[]},{"level":2,"heading":"b. Its promises","bibleReferences":["Jeremiah 11:2–5","Jeremiah 7:3–7","Exodus 32:13"],"subsections":[]},{"level":2,"heading":"c. Its threats","bibleReferences":["Deuteronomy 6:20","Deuteronomy 11:26–28","Deuteronomy 27:26","Deuteronomy 29:22–28","Deuteronomy 30:15–20"],"subsections":[]},{"level":2,"heading":"3. The Kindness of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The absolute dominion of God","bibleReferences":[],"subsections":[]},{"level":2,"heading":"b. The promises to Abraham","bibleReferences":["Exodus 32:13–14"],"subsections":[]},{"level":2,"heading":"c. The sacrificial system","bibleReferences":["Leviticus 5:14–19","Leviticus 16:21–22"],"subsections":[]},{"level":2,"heading":"d. The history of Israel","bibleReferences":["Deuteronomy 4:25–31","Nehemiah 9:7–8"],"subsections":[]},{"level":2,"heading":"4. The Function of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The covenant governs the people","bibleReferences":["Deuteronomy 4:1–2"],"subsections":[]},{"level":2,"heading":"b. The covenant governs the priesthood","bibleReferences":["Exodus 40:12–16","Leviticus 10:1–2"],"subsections":[]},{"level":2,"heading":"c. The covenant governs the kingship","bibleReferences":["Deuteronomy 17:14–20"],"subsections":[]},{"level":2,"heading":"d. The covenant governs the prophets","bibleReferences":["Numbers 12:6","Deuteronomy 13:1–5"],"subsections":[]},{"level":2,"heading":"e. The covenant governs blessing and cursing","bibleReferences":["Deuteronomy 27:9–10","Deuteronomy 28:1–2","Deuteronomy 31:9–13","Deuteronomy 32:45–47"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Hebrews 10:1"],"subsections":[]}]},{"chapterNumber":8,"title":"Chapter 8: The Davidic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The promises of the Abrahamic Covenant","bibleReferences":["Genesis 17:6"],"subsections":[]},{"level":2,"heading":"b. The problems of the Mosaic Covenant","bibleReferences":["Judges 2:10–11","Judges 21:25"],"subsections":[]},{"level":2,"heading":"c. The preference of the people","bibleReferences":["1 Samuel 8:7–9"],"subsections":[]},{"level":2,"heading":"d. The prospect of consummation","bibleReferences":["Deuteronomy 12:8–12"],"subsections":[]},{"level":2,"heading":"2. The Blessings of the Covenant","bibleReferences":["2 Samuel 7:8–16"],"subsections":[]},{"level":2,"heading":"a. An established throne","bibleReferences":[],"subsections":[]},{"level":2,"heading":"b. Rest and prosperity in Canaan","bibleReferences":["1 Kings 8:56","Psalm 144:1–2"],"subsections":[]},{"level":2,"heading":"c. The presence and protection of God","bibleReferences":["1 Kings 6:12–13"],"subsections":[]},{"level":2,"heading":"3. The Conditions of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Guard God's sanctuary","bibleReferences":["2 Samuel 7:13"],"subsections":[]},{"level":2,"heading":"b. Keep God's law","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. Represent God's people","bibleReferences":[],"subsections":[]},{"level":2,"heading":"4. The Sanctions of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The judgment of God himself","bibleReferences":["2 Samuel 7:14","Psalm 132:11–12","1 Kings 8:25–26"],"subsections":[]},{"level":2,"heading":"b. Expulsion from the land of Canaan","bibleReferences":["1 Kings 9:4–9","1 Kings 11:11–13","2 Kings 23:26–27"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":9,"title":"Chapter 9: The Messiah of the Old Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Messianic Purpose of the Old Covenant","bibleReferences":["Romans 9:4","Ephesians 2:12","Hebrews 10:1"],"subsections":[]},{"level":2,"heading":"2. The Messianic Hope of the Old Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The present Messiah","bibleReferences":["Psalm 18:50","Psalm 20:6–9","Psalm 132:10–18"],"subsections":[]},{"level":2,"heading":"b. The future Messiah","bibleReferences":["Hosea 6:7","Psalm 89:28–49","Jeremiah 33:14–18","Isaiah 9:1–7"],"subsections":[]},{"level":2,"heading":"3. The Messianic Promise of a New Covenant","bibleReferences":["Ezekiel 37:24–28","Jeremiah 31:31–34"],"subsections":[]},{"level":2,"heading":"4. The Messianic Inclusion of the Nations","bibleReferences":["Micah 4:1–4","Isaiah 2:2–4","Haggai 2:6–9","Isaiah 11:1–10"],"subsections":[]},{"level":2,"heading":"5. The Typological Nature of the Kingdom","bibleReferences":["Luke 1:26–33","Mark 1:14–15","John 1:41"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":10,"title":"Chapter 10: The Ministry of the Christ","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Gospel of the Kingdom","bibleReferences":["Mark 1:14–15","Luke 4:18","Matthew 11:28–30","Matthew 9:11–12","Mark 1:34","John 10:14–18","Ezekiel 34:22–25","John 11:25–27"],"subsections":[]},{"level":2,"heading":"2. The Kingdom of Heaven","bibleReferences":["John 18:36","John 3:3–6","Matthew 8:11–12","John 8:39","Matthew 16:16–19","Matthew 18:1–4","Matthew 8:10–12"],"subsections":[]},{"level":2,"heading":"3. The King of the Kingdom","bibleReferences":["Matthew 5:17–20","Matthew 21:9"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":11,"title":"Chapter 11: The Covenant of Redemption","sections":[{"level":2,"heading":"Introduction","bibleReferences":["2 Timothy 1:9","Titus 1:2"],"subsections":[]},{"level":2,"heading":"1. The Parties of the Covenant","bibleReferences":["Isaiah 42:1–7","Isaiah 49:8–9","Isaiah 50:4–9","Luke 4:17–21"],"subsections":[]},{"level":2,"heading":"a. The Son's commitments","bibleReferences":["John 10:17–18","Psalm 2:6–9","Psalm 110:4","Hebrews 7:28","Isaiah 61:1–2","John 17:8"],"subsections":[]},{"level":2,"heading":"b. The Father's commitments","bibleReferences":["Isaiah 42:6","Isaiah 49:8","Isaiah 50:7","Luke 1:35","Matthew 12:27–28","Hebrews 9:14","Isaiah 53:10–12","Philippians 2:8–11","1 John 3:8"],"subsections":[]},{"level":2,"heading":"3. The Fulfillment of the Covenant","bibleReferences":["Philippians 2:5–8","Isaiah 50:5–7","Isaiah 53:10–12","Acts 2:32–33","Hebrews 10:12–14","Revelation 5:12","Hebrews 5:3"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":12,"title":"Chapter 12: The New Covenant of Grace","sections":[{"level":2,"heading":"Introduction","bibleReferences":["Matthew 1:1","Luke 1:68–75","Galatians 4:4–5"],"subsections":[]},{"level":2,"heading":"1. The Establishment of the New Covenant","bibleReferences":["Hebrews 8:6","Hebrews 9:11–15","Ephesians 2:16","Colossians 1:20–22","Hebrews 9:24–26"],"subsections":[]},{"level":2,"heading":"2. The Blessings of the New Covenant","bibleReferences":["Jeremiah 31:31–34","Hebrews 8:8–13"],"subsections":[]},{"level":2,"heading":"a. Justification","bibleReferences":["Romans 5:17–19","Hebrews 10:14","Psalm 103:12","Isaiah 53:5","Hebrews 9:9–10","Hebrews 9:13–14","Isaiah 53:11","Romans 5:18–19","Romans 5:1–2","Romans 10:9–13"],"subsections":[]},{"level":2,"heading":"b. Regeneration and Sanctification","bibleReferences":["Jeremiah 31:33–34","Ezekiel 36:26–27","Deuteronomy 10:16","Jeremiah 4:4","Deuteronomy 30:6","John 3:3","Colossians 1:12","1 Corinthians 15:48","Ephesians 4:23","Colossians 3:10","Romans 6:17–18","Ephesians 2:1–10","2 Corinthians 3:5–9","Romans 3:20","Romans 5:1–2","Isaiah 54:13","John 6:45","Jeremiah 31:34","1 John 2:20–21","Romans 10:17","James 1:18","1 Peter 1:23"],"subsections":[]},{"level":2,"heading":"c. Adoption and Preservation","bibleReferences":["John 1:12–13","Romans 8:15","1 John 3:1–2","Hebrews 12:3–11","Jeremiah 32:40"],"subsections":[]},{"level":2,"heading":"d. Resurrection and Glorification","bibleReferences":["Psalm 16:10","Romans 4:25","John 6:39–40","Hebrews 2:10","Colossians 1:18","1 Corinthians 15:45","Colossians 3:1–4","1 Corinthians 15:54–57","Mark 3:22–27","Colossians 1:12","Romans 8:18–25","1 Corinthians 2:9","2 Corinthians 4:13–18","Revelation 22:4","2 Corinthians 4:6","Psalm 73:23–28","Psalm 16:11"],"subsections":[]},{"level":2,"heading":"3. The Foundation of the New Covenant","bibleReferences":["Hebrews 7:22","Ephesians 1:11","Hebrews 9:15","Romans 8:9","1 John 5:11–13","Hebrews 6:13–16","Hebrews 6:17–20","Hebrews 7:15–22","Jeremiah 31:32","Ephesians 2:8–9"],"subsections":[]},{"level":2,"heading":"4. The Kingdom of the New Covenant","bibleReferences":["Colossians 1:18","Luke 22:29"],"subsections":[]},{"level":2,"heading":"5. The People of the New Covenant","bibleReferences":["Romans 8:1","Romans 8:9","Romans 8:14","Romans 8:17","Romans 8:29–30","Romans 8:31","Romans 8:33–39","Colossians 1:12–14"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":13,"title":"Chapter 13: The Mystery of Christ","sections":[{"level":2,"heading":"Introduction","bibleReferences":["2 Timothy 1:9","Titus 1:2","Romans 1:16","Acts 1:6"],"subsections":[]},{"level":2,"heading":"1. The Unity of God's Plan","bibleReferences":["Ephesians 1:9–10","Acts 2:38–39","Colossians 1:25–28","Colossians 2:4–23","Ephesians 3:1–6","1 Peter 1:10–12"],"subsections":[]},{"level":2,"heading":"2. Israel, Christ, and the Church","bibleReferences":["Acts 28:23","Acts 19:8–9"],"subsections":[]},{"level":2,"heading":"a. Israel","bibleReferences":["Romans 11:1","Romans 4:1","2 Corinthians 11:22","Acts 3:25–26","Romans 9:3–5","Ephesians 2:12","Romans 10:4","Romans 4:9–17","Romans 4:11","John 8:37","John 8:39","Romans 9:8","Romans 4:12","Galatians 3:7","Galatians 3:16–17","Galatians 3:15","Galatians 3:19–22","Galatians 4:21–31","2 Corinthians 3:14–16","Romans 3:1–4","Matthew 20:1–16","John 1:11"],"subsections":[]},{"level":2,"heading":"b. The Christ","bibleReferences":["Matthew 1:1","Romans 1:16","Romans 11:1","Romans 4:1","2 Corinthians 11:22","Romans 11:1–10","Romans 11:23"],"subsections":[]},{"level":2,"heading":"c. The Church","bibleReferences":["Psalm 118:22–23","Ephesians 2:19–22","1 Peter 2:4–10","John 1:12–13","Philippians 3:3","Colossians 1:18","Galatians 3:26–28","Romans 11:16–24","Galatians 6:16","2 Corinthians 5:16–17","Galatians 3:24","Hebrews 8:13"],"subsections":[]},{"level":2,"heading":"3. The Continuity of the Law and the Gospel","bibleReferences":["John 8:56","Romans 4:6–8","1 Corinthians 10:1–4","Galatians 3:8","Hebrews 9:25–26","Psalm 32:1","Romans 4:7–8","Matthew 5:20–24","Romans 2:14–15","Romans 13:8–10","1 John 5:1–3","Jeremiah 31:33"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Colossians 4:3–4","Romans 11:33–36"],"subsections":[]}]},{"chapterNumber":14,"title":"Chapter 14: The Eschatological Nature of the Kingdom","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Kingdom Inaugurated","bibleReferences":["Romans 10:14–15","2 Corinthians 5:20","Revelation 2:5","Romans 8:9","John 3:3"],"subsections":[]},{"level":2,"heading":"2. The Keys of the Kingdom","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Joining the kingdom through the covenant","bibleReferences":["1 Peter 4:3","Romans 10:9","Hebrews 9:15"],"subsections":[]},{"level":2,"heading":"b. Guarding the kingdom through the covenant","bibleReferences":["1 John 1:10","Hebrews 12:14","John 3:18"],"subsections":[]},{"level":2,"heading":"c. Traitors of the kingdom","bibleReferences":["1 John 2:19","Acts 8:13","2 Peter 2:1","Hebrews 6:4–6","Psalm 50:16"],"subsections":[]},{"level":2,"heading":"3. The Sacraments of the Kingdom","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Baptism","bibleReferences":["Romans 6:3–5","1 Peter 3:21–22","1 Corinthians 5:11"],"subsections":[]},{"level":2,"heading":"b. The Lord's Supper","bibleReferences":["Hebrews 10:23–25"],"subsections":[]},{"level":2,"heading":"4. The Kingdom Consummated","bibleReferences":["Acts 17:31","Acts 17:30","Psalm 2:12","2 Peter 3:15","2 Thessalonians 1:4–10","Hebrews 9:27–28","Matthew 25:31–46","Revelation 20:15","1 Corinthians 15:24","Revelation 21:1–7","Revelation 21:12","Revelation 21:26","Revelation 22:2","Revelation 21:23","Revelation 5:9–10","Revelation 21:3–4","Revelation 22:4","Revelation 22:16–18"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Romans 9:5"],"subsections":[]}]},{"chapterNumber":15,"title":"Conclusion","sections":[{"level":1,"heading":"Conclusion","bibleReferences":["Romans 8:32","Hebrews 6:19","Romans 10:11–13","Ephesians 3:14–21"],"subsections":[]}]}]}

// ── Parts map ─────────────────────────────────────────────────────────────────

const PARTS: Record<number, string> = {
  1: 'Part One: Methodology and Hermeneutics',
  4: 'Part Two: The Kingdom of Creation',
  6: 'Part Three: The Kingdom of Israel',
  10: 'Part Four: The Kingdom of Christ',
}

// ── Chapter quotes ────────────────────────────────────────────────────────────

const QUOTES: Record<number, string> = {
  1: 'Necessary consequences don\'t work for covenants because there is no necessity in covenants. Covenants are not natural. They are not a part of the created order.',
  2: 'Typology without Christ at its center is concerned with something other than the mystery of Christ, His covenant, and His kingdom. And it is therefore, by definition, not typology.',
  3: 'A covenant is a divinely sanctioned commitment defining the relationship between God and another party. And a covenant functions as the God-ordained legal basis upon which a kingdom is founded and by which a kingdom is governed.',
  4: 'Adam did not fall out of bed and bonk his head. He fell from orbit and was obliterated when he hit the ground.',
  5: 'We can do no more than trust and obey... we are both citizens of a common cursed kingdom of common grace.',
  6: 'The Old Covenant is pregnant with the New Covenant.',
  7: 'Without righteousness, there is no blessing. Without the spilling of blood, there is no remission of sins. Without the High Priest, there is no sacrifice.',
  8: 'As goes the king, so goes the kingdom.',
  9: 'The prophets did not know Him, but Jesus Christ was the hope of the Israelites. He was promised to them... the dawning light of Jesus Christ gleamed on the horizon.',
  10: 'They tripped over the stumbling block in Zion, the mystery of Christ.',
  11: 'What the Father planned, the Son accomplished, and the Spirit applies.',
  12: 'The New Covenant, which powerfully causes its children to be born again and gives them faith, thereby fulfills its own requirements in its own people... Even that which He requires of us He supplies to us.',
  13: 'The kingdom of Israel and its covenants were scaffolding around the kingdom of Christ and His covenant.',
  14: 'To join the kingdom is to be placed on the side of Christ and to unite with the children of God and heirs of the new creation. To abandon or be removed from the kingdom is to be unmasked and placed on the side of Satan with his hell-bound children.',
}

// ── Section notes ─────────────────────────────────────────────────────────────
// Key format: "chapterNumber-heading"

const NOTES: Record<string, string> = {
  '1-Introduction': 'Studying covenant theology requires humility and careful method, since it deals with the whole sweep of God\'s redemptive plan. The chapter previews four methodological issues that shape how biblical and systematic theology should work together in this field.',
  '1-1. Scope and Simplicity': 'Because covenant theology spans all of Scripture, it can\'t be reduced to neat generalizations without losing accuracy. A sound system has to be built up from the full range of biblical detail, not simplified past the point of usefulness.',
  '1-2. Creation, Covenant, and Consequences': 'Covenants are freely instituted by God rather than built into nature, so no covenant\'s features can be assumed to carry over to another by logical necessity. This means conclusions about any given covenant must come from what God actually revealed about it, not from inference or analogy with other covenants.',
  '1-3. The Law and the Gospel': 'Law and gospel are opposite paths to righteousness in a doctrinal sense, yet both are also historical labels for the Old and New Testament eras. Salvation by grace runs continuously through both periods, so the covenants shouldn\'t be collapsed into one another just because they share that underlying continuity.',
  '1-4. History and Mystery': 'Christ\'s saving plan for the nations was only partially disclosed before the New Testament, described by Paul as a "mystery" gradually unveiled rather than a truth hidden and then dropped in all at once. A responsible covenant theology should let the Old Testament\'s witness to Christ stay veiled the way Scripture itself presents it, rather than reading later clarity back into earlier stages.',
  '1-Conclusion': 'These four considerations set the methodological groundwork for the rest of the study. Given how vast and demanding the subject is, the fitting response is humility and worship rather than confidence in one\'s own mastery of it.',

  '2-Introduction': 'Typology is central to biblical interpretation and especially to understanding covenant theology, since the Bible\'s covenants and their patterns of fulfillment are closely intertwined.',
  '2-1. What is Typology?': 'Typology is the divinely intended correspondence between earlier and later persons, events, and institutions in Scripture, where the earlier one anticipates and is surpassed by the later. This pattern is not limited to places where the Bible explicitly labels something a "type" — interpreters are justified in identifying further typological connections as long as they stay grounded in how Scripture itself uses earlier material, not in speculation.',
  '2-2. The Relation between a Type and its Antitype': 'Definitions of typology often agree in general but differ sharply once applied, so this section works out more precisely how a type relates to what it points to.',
  '2-a. Types reveal something greater, and other, than themselves.': 'A type isn\'t simply a weaker version of its fulfillment on the same scale — Scripture treats types and antitypes as genuinely different things, using language like shadow versus substance or picture versus reality. Old Testament persons, objects, and rituals (bread, rock, sacrifices, tabernacle) truly pointed to Christ without themselves being Christ.',
  '2-b. Types function on two levels.': 'Types carried a real, meaningful function in their own original setting while simultaneously pointing ahead to a greater fulfillment in Christ — the animal sacrifices, for instance, genuinely dealt with outward, earthly guilt even though they could never cleanse the conscience. This two-level function is what allowed Old Testament believers to receive real spiritual benefit from institutions that were not themselves the final reality.',
  '2-c. Types terminate in their antitypes.': 'Once the greater reality a type pointed to has arrived, the type itself is no longer needed and is set aside. Continuing to rely on the type after the antitype has come amounts to denying that the fulfillment has actually taken place.',
  '2-d. Types are positive and negative.': 'Types can foreshadow the coming fulfillment either by positive resemblance or by highlighting failure and insufficiency that the fulfillment will correct. Either way, the point of the comparison is to magnify how much greater the antitype is than the type that anticipated it.',
  '2-3. The Application of Typological Principles': 'Differences in how theologians apply typology, even while agreeing on its basic definition, produced real disagreements in Reformed covenant theology — most notably over whether the Mosaic (and Abrahamic) covenant differed from the New Covenant merely in degree or in actual substance. Because a type is genuinely distinct from its antitype, this book follows those (like Owen and the Particular Baptists) who held that the Old and New Covenants differ in substance, not just in administration.',
  '2-Conclusion': 'Small differences in how typology is applied can lead to very different theological conclusions down the line, so getting the underlying principles right matters a great deal.',

  '3-Introduction': 'Before laying out the biblical covenants in detail, two basic questions need answers: what exactly is a covenant, and what does a covenant actually do?',
  '3-a. The definition of a covenant': 'A covenant involves mutual "I will / you will" commitments, but since God is always the initiating party, His covenants are gracious gifts rather than negotiated deals, offering people something beyond what they could ever claim by nature.',
  '3-b. Covenant sanctions': 'What turns a bare commitment into a formal covenant is the presence of sanctions — threats, often historically dramatized through rituals like animals cut in half, that guarantee the commitments will be honored. A careful reading of Hebrews 9:16–17 in its original Greek shows this same logic: a covenant is ratified by a pledge of death, not activated like a will after someone dies.',
  '3-c. The matter and form of a covenant': 'The "matter" of a covenant is the substance of what\'s promised (law or promise), while the "form" is reached once sanctions officially ratify those commitments; a covenant built on law and obedience becomes a covenant of works, while one built on promise and reception becomes a covenant of grace.',
  '3-d. Federal headship': 'God consistently deals with groups of people through a single representative head (Adam, Noah, Abraham, David, Christ), and that relationship is direct and immediate — descendants belong to the covenant by virtue of their connection to the head himself, not through the faithfulness of the generations in between.',
  '3-2. What is a Covenant\'s Function?': 'Covenants are the legal means by which God delegates and structures His rule over particular kingdoms, defining their boundaries, leaders, laws, and promises; the book identifies three such kingdoms — creation, Israel, and Christ\'s kingdom — each governed by its own set of covenants that ultimately converge in the one kingdom of God under Christ.',
  '3-Conclusion': 'A covenant is a divinely guaranteed commitment that defines a relationship with God, and it functions as the legal foundation on which God establishes and governs a kingdom — a framework the rest of the book will trace from creation onward.',

  '4-Introduction': 'Even though Genesis never uses the word "covenant" for God\'s dealings with Adam, the substance of a covenant is clearly present once we notice everything God gave Adam beyond what was simply due to him as a creature.',
  '4-1. Man\'s Created Condition': 'Adam was created good, as part of a good creation, and by nature owed God complete obedience without any right to expect a reward beyond God\'s approval — anything more would have to come from God\'s own free initiative.',
  '4-2. Man\'s Covenantal Condition': 'Tracing everything God did with Adam beyond his basic created status shows a genuine covenant relationship at work.',
  '4-a. God placed Adam in the garden of Eden': 'Eden functioned as a sanctuary of God\'s presence, built with the same kind of imagery later temples would echo, and Adam was placed there as a kind of king over that space, tasked with working and guarding it.',
  '4-b. God appointed Adam federal head over his natural offspring': 'Adam represented all of humanity as their covenantal head, so that his standing before God would determine the standing of everyone descended from him.',
  '4-c. God obligated Adam to a law of obedience': 'Beyond the natural moral law, Adam received specific added commands, and his task of guarding Eden functioned like a priestly and prophetic duty to protect the purity of God\'s word and presence there.',
  '4-d. God promised eternal life to Adam': 'The tree of life symbolized the reward of confirmed, unbreakable communion with God that Adam would have secured through obedience — something not automatically his by nature, but held out to him through this covenant arrangement.',
  '4-e. God threatened Adam with sanctions': 'Disobedience carried the guaranteed penalty of death, with the tree of the knowledge of good and evil serving as the visible marker of that threat.',
  '4-f. God made a Covenant of Works with Adam': 'Taken together — a defined realm, a federal head, a law, a reward, and a curse — everything necessary for a covenant is present in God\'s dealings with Adam, whether or not Genesis uses that specific word.',
  '4-g. God tested Adam\'s obedience': 'Adam\'s obedience had to be proven through an actual test, and his failure in that test brought the covenant\'s curse down on himself and all whom he represented.',
  '4-3. Man\'s Cursed Condition': 'Adam\'s disobedience triggered the covenant\'s full penalty, even though physical death didn\'t come instantly.',
  '4-a. Death': 'Because Adam represented all humanity, his sin brought collective death — physical, spiritual, and ultimately eternal — on the whole human race.',
  '4-b. The abrogation of the covenant of works': 'With no more Eden, no more positive commands, and no other party able to fulfill Adam\'s role, the covenant\'s promise of life through obedience is now permanently closed off, even though its curse and the underlying moral law remain in force.',
  '4-c. A merciful curse': 'God softened the immediate severity of the curse by first promising, in Genesis 3:15, that a future offspring would defeat the serpent — turning what could have been pure judgment into disciplinary judgment tempered with hope.',
  '4-4. The Protological Nature of the Kingdom': 'Eden and the Covenant of Works establish the foundational pattern that later biblical history — Israel, and ultimately Christ — will repeat and fulfill on a larger scale.',
  '4-Conclusion': 'Through the Covenant of Works, God gave Adam a kingdom to build toward a perfected creation; Adam\'s failure left that kingdom under a curse that still governs human existence, but God\'s promise of a deliverer set redemptive history in motion.',

  '5-Introduction': 'Like the Covenant of Works, the Noahic Covenant governs the whole created order; it arises after human wickedness grew so severe that God judged the world with the flood.',
  '5-1. A New Creation and Commission': 'The flood account is deliberately written to echo Genesis 1, but it isn\'t a reset to paradise or innocence — humanity\'s heart remains just as corrupt, and Noah\'s renewed commission to be fruitful and multiply is framed in terms of mastering a hostile world by force rather than building a holy civilization the way Adam\'s original calling envisioned.',
  '5-2. A Judicial Retribution': 'God institutes capital punishment for murder and establishes a basic standard of justice binding on every human society, centered on protecting human life and the family as the means by which humanity continues.',
  '5-3. A Promised Preservation': 'God unconditionally promises never again to destroy the earth by flood, sealing that promise with the rainbow; this preservation isn\'t tied to human obedience but simply provides a stable stage on which the rest of God\'s redemptive plan can unfold.',
  '5-4. A Common Cursed Kingdom of Common Grace': 'Together, the Covenant of Works and the Noahic Covenant define the world all people currently live in — a kingdom still under the curse of Adam\'s sin, yet stabilized and sustained by God\'s common kindness toward believer and unbeliever alike.',
  '5-Conclusion': 'The kingdom of creation, governed jointly by the Covenant of Works and the Noahic Covenant, is a common realm marked by both curse and kindness, existing to preserve humanity until God\'s larger promises are fulfilled.',

  '6-Introduction': 'Before this covenant, there was no formally constituted nation of Israel, no defined people of God, and no specific land set apart for them — all of that begins with God\'s covenant with Abraham.',
  '6-1. The Initiation of the Covenant': 'Genesis 12 lays the groundwork through three key elements.',
  '6-a. The federal head': 'Abraham functions as the representative head of this covenant, meaning participation in its promises depends on one\'s relationship to him.',
  '6-b. The inheritance of Canaan': 'God\'s promise that Abraham\'s descendants would possess Canaan marks the actual founding of Israel as a kingdom-people with a specific territory.',
  '6-c. The blessing for the nations': 'From the outset the covenant looks beyond Israel itself, promising that a blessing for the whole world would come through Abraham\'s line — meaning Israel\'s national identity was always meant to serve a larger, global purpose rather than being an end in itself.',
  '6-2. The Confirmation of the Covenant': 'In Genesis 15, God formalizes the promises given in Genesis 12 through an official covenant ceremony, symbolically swearing an oath on Himself to guarantee that Abraham\'s descendants would multiply and inherit the land.',
  '6-3. The Expansion of the Covenant': 'Genesis 17 adds new commitments: a promise that kings would come from Abraham\'s line, and a demand that Abraham\'s household keep the covenant through circumcision, with the individual penalty of being "cut off" for failing to comply — even though the nation\'s promises as a whole remained guaranteed regardless of any individual\'s failure.',
  '6-4. The Realization of the Covenant': 'Later Scripture (Joshua, Nehemiah, Kings, the Gospels) records that God fulfilled every element of His promise to Abraham — the land was possessed, the descendants multiplied, and the promised offspring was eventually born.',
  '6-5. The Foundation of the Old Covenant': 'Genesis 12–17 lays the groundwork for everything that follows in Israel\'s covenant history, since later covenants build directly on what Abraham\'s covenant established.',
  '6-a. The Abrahamic Covenant anticipates the Mosaic Covenant': 'The requirement to keep circumcision or be cut off previews the larger structure of law and consequence that the Mosaic covenant will spell out in much greater detail.',
  '6-b. The Abrahamic covenant anticipates the Davidic Covenant': 'The repeated promise that kings would descend from Abraham points forward to the establishment of a specific royal line.',
  '6-c. The Abrahamic Covenant anticipates the New Covenant': 'Because the promised offspring who blesses the nations is the one who brings the New Covenant, the Abrahamic Covenant both predicts and typologically foreshadows it — its earthly people, land, and kings function as pictures of a greater spiritual reality.',
  '6-d. The Abrahamic covenant echoes Eden': 'Abraham\'s calling to a special place with a commission tied to a coming blessing mirrors Adam\'s situation in Eden, though Israel would prove no more faithful to its calling than Adam was to his.',
  '6-Conclusion': 'Through a series of stages, God bound Himself to multiply Abraham\'s family and give them Canaan, while requiring Abraham\'s household to keep the covenant through circumcision — and it is from this family that the promised blessing for all nations would eventually come.',

  '7-Introduction': 'Israel had every reason to obey God out of sheer gratitude even before the Exodus, but their enslavement in and deliverance from Egypt gave that obedience an even deeper motivation.',
  '7-a. The promise of oppression and affliction': 'God had told Abraham centuries earlier that his descendants would spend a long period enslaved before receiving the land, and by the time of Moses that foretold period of suffering had run its course.',
  '7-b. The promise of liberation and fulfilment': 'God\'s deliverance of Israel from Egypt is explicitly tied to His remembrance of His covenant with Abraham, so the Exodus itself functions as God keeping His earlier promise.',
  '7-2. The Kind of Covenant': 'Like the Abrahamic Covenant, this one combines guaranteed divine promises with a real demand for obedience as the condition for enjoying them.',
  '7-a. Its laws': 'At Sinai, Israel formally pledges obedience to the law God gives through Moses, and that pledge is sealed with a blood ceremony that functions as a binding oath.',
  '7-b. Its promises': 'The blessings held out through obedience to the Mosaic law are simply the further enjoyment of what God had already promised Abraham — nothing more, nothing less.',
  '7-c. Its threats': 'Obedience to the law brings blessing in the land, while disobedience brings curses, up to and including exile, a pattern spelled out repeatedly in Deuteronomy.',
  '7-3. The Kindness of the Covenant': 'Despite being built on the principle of obedience, this covenant reflects real divine kindness in several ways.',
  '7-a. The absolute dominion of God': 'Since God owes people nothing to begin with, offering any covenant of blessing in exchange for obedience — especially to sinners who deserve judgment — is itself an act of grace.',
  '7-b. The promises to Abraham': 'Even when Israel broke the covenant badly (as with the golden calf), God\'s prior commitment to Abraham became grounds for mercy rather than total destruction.',
  '7-c. The sacrificial system': 'God provided a system of sacrifices that allowed Israel to find real, if limited, forgiveness and atonement for their sins, teaching them about guilt and substitution even though it couldn\'t ultimately cleanse the conscience.',
  '7-d. The history of Israel': 'Israel\'s ongoing history of disobedience, discipline, and restoration illustrates God\'s patient faithfulness to His covenant promises despite the nation\'s repeated unfaithfulness.',
  '7-4. The Function of the Covenant': 'The Mosaic law regulated every dimension of life within the kingdom of Israel.',
  '7-a. The covenant governs the people': 'Both moral and additional positive laws structured the everyday life and conduct of the nation.',
  '7-b. The covenant governs the priesthood': 'The law established who could serve as priests, defined their duties, and disciplined any deviation from what God had commanded.',
  '7-c. The covenant governs the kingship': 'Unlike surrounding nations, Israel\'s kings were placed under the law rather than being its source — required to copy, read, and obey it rather than create their own rules.',
  '7-d. The covenant governs the prophets': 'True prophets were identified by whether their message matched the existing law, meaning prophetic authority was always accountable to God\'s prior revealed word.',
  '7-e. The covenant governs blessing and cursing': 'Ultimately, the whole relationship between Israel and God under this covenant hinged on obedience: blessing for compliance, curse for rebellion, reinforced through ceremonies and regular public reading of the law.',
  '7-Conclusion': 'The Mosaic Covenant governed every level of Israel\'s national life, extending and applying the same obedience-based relationship first established through Abraham, while also planting typological seeds — through its priesthood and sacrifices especially — that anticipated the coming Messiah.',

  '8-Introduction': 'With Israel now settled in the land under the law of Moses, God\'s covenant with David brings the kingdom of Israel to its full, mature form. Several converging threads set the stage for God\'s covenant with David.',
  '8-a. The promises of the Abrahamic Covenant': 'God had already promised Abraham that kings would come from his line, later narrowed to the tribe of Judah, so a covenant establishing kingship is a direct outworking of that earlier promise.',
  '8-b. The problems of the Mosaic Covenant': 'After Israel settled in Canaan, a new generation grew up ignorant of what it took to get there, fell into disobedience and idolatry, and the resulting chaos of the Judges period — summed up in the refrain that everyone did as they saw fit with no king in Israel — showed the nation\'s desperate need for someone to keep God\'s law on the people\'s behalf.',
  '8-c. The preference of the people': 'Israel\'s demand for a king "like the other nations" was itself a rejection of God\'s own kingship, and their first king, Saul, was chosen according to that flawed desire rather than God\'s own selection, which is why his reign ultimately failed.',
  '8-d. The prospect of consummation': 'The law of Moses had already looked forward to a future time of rest when God would establish one central place for His presence and worship, setting up the expectation that David\'s covenant would fulfill.',
  '8-2. The Blessings of the Covenant': 'God\'s covenant with David, recorded in 2 Samuel 7, promises three main things.',
  '8-a. An established throne': 'Rather than being a kingship built on the people\'s own initiative, David\'s dynasty is secured by God\'s own commitment, giving the nation lasting stability centered on God\'s chosen king.',
  '8-b. Rest and prosperity in Canaan': 'The covenant promises Israel security and peace in the land, a promise only partially realized earlier under Joshua but brought to fuller completion under David and Solomon.',
  '8-c. The presence and protection of God': 'Central to the covenant is the promise that God\'s presence would dwell among His people, ultimately fulfilled through the building of the temple under Solomon.',
  '8-3. The Conditions of the Covenant': 'Alongside its promises, the covenant places real obligations on David\'s line.',
  '8-a. Guard God\'s sanctuary': 'The king bears responsibility for building and protecting the purity of God\'s temple and worship, giving Israelite kingship a priestly dimension.',
  '8-b. Keep God\'s law': 'The king is required to know, copy, and obey God\'s law rather than create his own, giving the kingship a prophetic dimension as well.',
  '8-c. Represent God\'s people': 'Unlike Moses, the Davidic king functions as a true federal head for the nation, meaning the king\'s own faithfulness or unfaithfulness directly determines the blessing or cursing of the whole people.',
  '8-4. The Sanctions of the Covenant': 'Like every covenant, this one is guaranteed and enforced by real consequences.',
  '8-a. The judgment of God himself': 'God promises to discipline unfaithful sons of David directly, describing the relationship as one of father and son.',
  '8-b. Expulsion from the land of Canaan': 'Persistent unfaithfulness in the king ultimately brings the same covenant curse threatened back in Moses\' day — national exile from the land — a pattern realized historically first in Solomon\'s later years and finally in the exiles of Israel and Judah.',
  '8-Conclusion': 'Together, the Abrahamic, Mosaic, and Davidic Covenants form one unified structure governing the kingdom of Israel, with the king\'s obedience to Moses\' law determining whether the nation enjoys or forfeits the blessings originally promised to Abraham.',

  '9-Introduction': 'Tracing how the concept of the Messiah developed within Israel\'s kingdom and covenants is really tracing the unfolding of the mystery of Christ itself, since "Messiah" and "Christ" are the same title.',
  '9-1. The Messianic Purpose of the Old Covenant': 'From Genesis 12 onward, Israel\'s covenants existed to produce the promised, nations-blessing descendant; broadly, the whole kingdom of Israel functioned as a shadow of greater realities, while more narrowly, the covenants increasingly focused expectation on one particular person, the son of David.',
  '9-2. The Messianic Hope of the Old Covenant': 'Israel\'s hope in "the anointed one" developed over time as historical circumstances shifted.',
  '9-a. The present Messiah': 'Originally, Israel\'s messianic hope centered on the reigning Davidic king himself, since the king was, quite literally, God\'s "anointed one" by virtue of the covenant made with David.',
  '9-b. The future Messiah': 'As one king after another failed to live up to the covenant\'s demands, especially highlighted by the exile, Israel\'s hope shifted from confidence in the current king to anticipation of a future, perfectly righteous son of David who would finally fulfill what earlier kings could not.',
  '9-3. The Messianic Promise of a New Covenant': 'In the depths of exile, the prophets began revealing that the coming Messiah would not just restore the nation but bring an entirely new kind of covenant — one marked by internal transformation and complete, permanent forgiveness, unlike the covenant Israel had broken.',
  '9-4. The Messianic Inclusion of the Nations': 'The prophets also made clear that this coming Messiah\'s blessings would extend beyond Israel to gather people from every nation into a renewed and perfected place of worship.',
  '9-5. The Typological Nature of the Kingdom': 'Because all of this was revealed through typology rather than plain statement, Israel\'s own expectations tended to stay tied to an idealized version of their present national existence, causing them to underestimate just how different and how much better the promised New Covenant would actually be.',
  '9-Conclusion': 'Across the whole sweep from Abraham to David, God\'s unfolding revelation pointed toward a coming son of David who would unite Israel and the nations through a new covenant — a hope finally realized in the arrival of Jesus.',

  '10-Introduction': 'Israel expected the Messiah to perfect their present national existence and free them from foreign rule, but Jesus\' actual ministry confused and offended many Jews precisely because it didn\'t do that.',
  '10-1. The Gospel of the Kingdom': 'From the start of His ministry, Jesus preached good news calling for repentance and faith, and that good news centered not merely on physical healing but on His coming sacrificial death, resurrection, and the gift of eternal life to all who trust Him.',
  '10-2. The Kingdom of Heaven': 'Jesus described a kingdom that is fundamentally not of this world — entered by spiritual rebirth rather than physical descent, open to Gentiles by faith apart from circumcision or the Jewish law — which deeply provoked many religious leaders who assumed automatic inclusion by virtue of their ancestry.',
  '10-3. The King of the Kingdom': 'Jesus claimed the full threefold office of prophet, priest, and king over this kingdom; the crowds who hailed Him as "Son of David" expected Him to overthrow Rome, but He had instead come to defeat Satan by laying down His life and inaugurating a new covenant in His own blood.',
  '10-Conclusion': 'Jesus\' earthly ministry began unveiling God\'s complete redemptive plan — a new humanity gathered into a new kingdom through a new covenant, received simply by faith in Him.',
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Section {
  level: number
  heading: string
  bibleReferences: string[]
  subsections: Section[]
}

interface Chapter {
  chapterNumber: number
  title: string
  sections: Section[]
}

interface VerseResult {
  reference: string
  text: string
  verses: { book_name: string; chapter: number; verse: number; text: string }[]
}

// ── Bible modal ───────────────────────────────────────────────────────────────

function BibleModal({ reference, onClose }: { reference: string; onClose: () => void }) {
  const [data, setData] = useState<VerseResult | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setData(null)
    setError(false)
    const normalized = reference.replace(/–|—/g, '-').trim()
    fetch(`https://bible-api.com/${encodeURIComponent(normalized)}?translation=kjv`)
      .then(r => r.json())
      .then(json => {
        if (json.error) setError(true)
        else setData(json)
      })
      .catch(() => setError(true))
  }, [reference])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="bible-modal-backdrop" onClick={onClose}>
      <div className="bible-modal" onClick={e => e.stopPropagation()}>
        <div className="bible-modal-header">
          <span className="bible-modal-ref">{reference}</span>
          <button className="bible-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="bible-modal-body">
          {!data && !error && <p className="bible-modal-loading">Loading…</p>}
          {error && <p className="bible-modal-loading">Could not load passage.</p>}
          {data && (
            <>
              {data.verses.map((v, i) => (
                <p key={i} className="bible-modal-verse">
                  <sup className="bible-modal-versenum">{v.verse}</sup>
                  {v.text}
                </p>
              ))}
              <p className="bible-modal-translation">King James Version</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Section component ─────────────────────────────────────────────────────────

function SectionRow({
  section, globalOpen, onRef, chapterNum, allNotes, isAdmin, onSaveNote,
}: {
  section: Section
  globalOpen: boolean | null
  onRef: (ref: string) => void
  chapterNum: number
  allNotes: Record<string, string>
  isAdmin: boolean
  onSaveNote: (key: string, text: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  const noteKey = `${chapterNum}-${section.heading}`
  const note = allNotes[noteKey] ?? NOTES[noteKey] ?? ''
  const hasContent = !!note || isAdmin || section.bibleReferences.length > 0 || section.subsections.length > 0

  useEffect(() => { if (globalOpen !== null) setOpen(globalOpen) }, [globalOpen])

  function startEdit(e: React.MouseEvent) {
    e.stopPropagation()
    setDraft(note)
    setEditing(true)
    if (!open) setOpen(true)
  }

  function saveNote() {
    onSaveNote(noteKey, draft)
    setEditing(false)
  }

  return (
    <div className="study-section">
      <div
        className={`study-section-header${hasContent ? ' clickable' : ''}`}
        onClick={() => hasContent && setOpen(o => !o)}
      >
        <span className={`study-toggle${!hasContent ? ' invisible' : ''}`}>
          {open ? '▾' : '▸'}
        </span>
        <span className="study-section-title">{section.heading}</span>
        {isAdmin && (
          <button className="study-note-edit-btn" onClick={startEdit} title={note ? 'Edit note' : 'Add note'}>
            {note ? '✎' : '+'}
          </button>
        )}
      </div>

      {hasContent && open && (
        <div className="study-section-body">
          {editing ? (
            <div className="study-note-editor">
              <textarea
                className="study-note-textarea"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                rows={4}
                autoFocus
                placeholder="Write a section note…"
              />
              <div className="study-note-actions">
                <button className="study-note-save" onClick={saveNote}>Save</button>
                <button className="study-note-cancel" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            note && <p className="study-section-note">{note}</p>
          )}
          {section.bibleReferences.length > 0 && (
            <div className="study-refs">
              {section.bibleReferences.map((ref, i) => (
                <span key={i} className="study-ref-tag" onClick={() => onRef(ref)}>{ref}</span>
              ))}
            </div>
          )}
          {section.subsections.map((sub, i) => (
            <SectionRow key={i} section={sub} globalOpen={globalOpen} onRef={onRef}
              chapterNum={chapterNum} allNotes={allNotes} isAdmin={isAdmin} onSaveNote={onSaveNote} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Study questions panel ─────────────────────────────────────────────────────

function StudyQuestions({
  chapterNum,
  questions,
  isAdmin,
  onSave,
}: {
  chapterNum: number
  questions: string[]
  isAdmin: boolean
  onSave: (chapterNum: number, questions: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(questions.join('\n'))

  useEffect(() => { setDraft(questions.join('\n')) }, [questions])

  if (!isAdmin && questions.length === 0) return null

  return (
    <div className="study-questions">
      <div className="study-questions-header" onClick={() => { if (!editing) setOpen(o => !o) }}>
        <span className="study-questions-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-questions-label">Study Questions</span>
        {isAdmin && !editing && (
          <button className="study-questions-edit-btn" onClick={e => { e.stopPropagation(); setOpen(true); setEditing(true) }}>
            {questions.length === 0 ? '+ Add' : 'Edit'}
          </button>
        )}
      </div>

      {open && (editing ? (
        <div className="study-questions-editor">
          <p className="study-questions-hint">One question per line.</p>
          <textarea
            className="study-questions-textarea"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={6}
            placeholder="Enter study questions, one per line…"
          />
          <div className="study-questions-actions">
            <button className="study-btn" onClick={() => {
              const qs = draft.split('\n').map(q => q.trim()).filter(Boolean)
              onSave(chapterNum, qs)
              setEditing(false)
            }}>Save</button>
            <button className="study-btn study-btn-ghost" onClick={() => {
              setDraft(questions.join('\n'))
              setEditing(false)
            }}>Cancel</button>
          </div>
        </div>
      ) : (
        questions.length > 0 && (
          <ol className="study-questions-list">
            {questions.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        )
      ))}
    </div>
  )
}

// ── Chapter component ─────────────────────────────────────────────────────────

function ChapterRow({
  chapter, globalOpen, onRef, questions, isAdmin, onSaveQuestions, allNotes, onSaveNote,
}: {
  chapter: Chapter
  globalOpen: boolean | null
  onRef: (ref: string) => void
  questions: string[]
  isAdmin: boolean
  onSaveQuestions: (chapterNum: number, questions: string[]) => void
  allNotes: Record<string, string>
  onSaveNote: (key: string, text: string) => void
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => { if (globalOpen !== null) setOpen(globalOpen) }, [globalOpen])

  const label = chapter.chapterNumber === 0 ? 'Preface'
    : chapter.chapterNumber === 15 ? 'Conclusion'
    : `Ch. ${chapter.chapterNumber}`

  return (
    <div className="study-chapter">
      <div className="study-chapter-header" onClick={() => setOpen(o => !o)}>
        <span className="study-chapter-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-chapter-num">{label}</span>
        <span className="study-chapter-title">{chapter.title}</span>
      </div>

      {open && (
        <div className="study-chapter-body">
          {chapter.chapterNumber === 0 && (
            <blockquote className="study-chapter-quote">
              "I will only add this: that on the whole, my aim has been to speak the truth in love and to take my notions from the Scriptures, not grafting any preconceived opinions of my own onto them. Where the evidence of truth appears, let it not be refused because it is offered in a mean dress and presented under the disadvantage of a rude and unpolished style. But consider instead the reason of what is said and with the noble Bereans search the Scriptures to see whether these things be so or not. And the Lord give you understanding in all things."
              <cite className="study-chapter-quote-cite">— Nehemiah Coxe</cite>
            </blockquote>
          )}
          {QUOTES[chapter.chapterNumber] && (
            <blockquote className="study-chapter-quote">
              "{QUOTES[chapter.chapterNumber]}"
              <cite className="study-chapter-quote-cite">— Samuel Renihan</cite>
            </blockquote>
          )}
          {chapter.sections.map((section, i) => (
            <SectionRow key={i} section={section} globalOpen={globalOpen} onRef={onRef}
              chapterNum={chapter.chapterNumber} allNotes={allNotes} isAdmin={isAdmin} onSaveNote={onSaveNote} />
          ))}
          <StudyQuestions
            chapterNum={chapter.chapterNumber}
            questions={questions}
            isAdmin={isAdmin}
            onSave={onSaveQuestions}
          />
        </div>
      )}
    </div>
  )
}

// ── Part component ────────────────────────────────────────────────────────────

function PartRow({
  title, chapters, open, onToggle, globalOpen, onRef, allQuestions, isAdmin, onSaveQuestions, allNotes, onSaveNote,
}: {
  title: string
  chapters: Chapter[]
  open: boolean
  onToggle: () => void
  globalOpen: boolean | null
  onRef: (ref: string) => void
  allQuestions: Record<string, string[]>
  isAdmin: boolean
  onSaveQuestions: (chapterNum: number, questions: string[]) => void
  allNotes: Record<string, string>
  onSaveNote: (key: string, text: string) => void
}) {
  return (
    <div className="study-part">
      <div className="study-part-header" onClick={onToggle}>
        <span className="study-part-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-part-title">{title}</span>
      </div>
      {open && (
        <div className="study-part-body">
          {chapters.map((ch, i) => (
            <ChapterRow
              key={i}
              chapter={ch}
              globalOpen={globalOpen}
              onRef={onRef}
              questions={allQuestions[String(ch.chapterNumber)] ?? []}
              isAdmin={isAdmin}
              onSaveQuestions={onSaveQuestions}
              allNotes={allNotes}
              onSaveNote={onSaveNote}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StudyPage() {
  const [globalOpen, setGlobalOpen] = useState<boolean | null>(null)
  const [openPart, setOpenPart] = useState<string | null>(null)
  const [allPartsOpen, setAllPartsOpen] = useState(false)
  const [activeRef, setActiveRef] = useState<string | null>(null)
  const [allQuestions, setAllQuestions] = useState<Record<string, string[]>>({})
  const [allNotes, setAllNotes] = useState<Record<string, string>>({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [saving, setSaving] = useState(false)

  function togglePart(key: string) {
    setAllPartsOpen(false)
    setOpenPart(prev => prev === key ? null : key)
  }

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('tc-auth') === '1')
    fetch('/api/study-questions/mystery-of-christ')
      .then(r => r.json())
      .then(setAllQuestions)
      .catch(() => {})
    fetch('/api/study-notes/mystery-of-christ')
      .then(r => r.json())
      .then(setAllNotes)
      .catch(() => {})
  }, [])

  async function handleSaveQuestions(chapterNum: number, questions: string[]) {
    const updated = { ...allQuestions, [String(chapterNum)]: questions }
    setAllQuestions(updated)
    setSaving(true)
    await fetch('/api/study-questions/mystery-of-christ', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setSaving(false)
  }

  async function handleSaveNote(key: string, text: string) {
    const updated = { ...allNotes, [key]: text }
    setAllNotes(updated)
    setSaving(true)
    await fetch('/api/study-notes/mystery-of-christ', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setSaving(false)
  }

  const chapters = outlineData.chapters as Chapter[]
  const preface = chapters.filter(c => c.chapterNumber === 0)
  const conclusion = chapters.filter(c => c.chapterNumber === 15)
  const partChapters: Record<string, Chapter[]> = {
    '1': chapters.filter(c => c.chapterNumber >= 1 && c.chapterNumber <= 3),
    '4': chapters.filter(c => c.chapterNumber >= 4 && c.chapterNumber <= 5),
    '6': chapters.filter(c => c.chapterNumber >= 6 && c.chapterNumber <= 9),
    '10': chapters.filter(c => c.chapterNumber >= 10 && c.chapterNumber <= 14),
  }

  return (
    <div className="main">
      {activeRef && <BibleModal reference={activeRef} onClose={() => setActiveRef(null)} />}

      <div className="study-page-header">
        <div className="section-label">Study</div>
        <h1 className="study-book-title">The Mystery of Christ</h1>
        <p className="study-book-author">Samuel Renihan</p>
        <p className="study-book-subtitle">His Covenant, and His Kingdom</p>
        <p className="study-book-attribution">Outline notes by the Theology Check author · not by Samuel Renihan</p>
      </div>

      <div className="study-controls">
        <button className="study-btn" onClick={() => { setAllPartsOpen(true); setOpenPart(null); setGlobalOpen(true); setTimeout(() => setGlobalOpen(null), 0) }}>Expand All</button>
        <button className="study-btn" onClick={() => { setAllPartsOpen(false); setOpenPart(null); setGlobalOpen(false); setTimeout(() => setGlobalOpen(null), 0) }}>Collapse All</button>
        {saving && <span className="study-saving">Saving…</span>}
      </div>

      <div className="study-outline">
        {preface.map((ch, i) => (
          <ChapterRow key={i} chapter={ch} globalOpen={globalOpen} onRef={setActiveRef}
            questions={allQuestions[String(ch.chapterNumber)] ?? []}
            isAdmin={isAdmin} onSaveQuestions={handleSaveQuestions}
            allNotes={allNotes} onSaveNote={handleSaveNote} />
        ))}

        {Object.entries(PARTS).map(([startNum, partTitle]) => (
          <PartRow
            key={startNum}
            title={partTitle}
            chapters={partChapters[startNum] ?? []}
            open={allPartsOpen || openPart === startNum}
            onToggle={() => togglePart(startNum)}
            globalOpen={globalOpen}
            onRef={setActiveRef}
            allQuestions={allQuestions}
            isAdmin={isAdmin}
            onSaveQuestions={handleSaveQuestions}
            allNotes={allNotes}
            onSaveNote={handleSaveNote}
          />
        ))}

        {conclusion.map((ch, i) => (
          <ChapterRow key={i} chapter={ch} globalOpen={globalOpen} onRef={setActiveRef}
            questions={allQuestions[String(ch.chapterNumber)] ?? []}
            isAdmin={isAdmin} onSaveQuestions={handleSaveQuestions}
            allNotes={allNotes} onSaveNote={handleSaveNote} />
        ))}
      </div>

      <p className="study-footer-note">
        This is an interactive study outline of <em>The Mystery of Christ, His Covenant, and His Kingdom</em> by Samuel Renihan (Founders Press).
        Outlines contain paraphrased summaries and Bible references for study purposes — not a substitute for the full book.{' '}
        <a href="https://www.amazon.com/Mystery-Christ-His-Covenant-Kingdom/dp/1943539154/" target="_blank" rel="noopener noreferrer">
          Purchase the book →
        </a>
      </p>
    </div>
  )
}
