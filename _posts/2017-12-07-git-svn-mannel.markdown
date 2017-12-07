---
layout: post
title: "git-svn mannel"
date: 2017-12-07 00:00:00
categories: Programming
tags: misc,ABC
---
1. git svn clone [svn_url]/trunk(或具体的branch) -[rStartVersion]:HEAD [targetFolder]
2. git config --add svn-remote.[svn/test(自定义远端分支名称)].url [svn_url]/branch/2012xxx（具体远端分支地址）
3. git config --add svn-remote.[svn/test].fetch [:refs/remotes/svn/test]
4. git svn fetch svn/test -[rStartVersion]:HEAD [targetFolder]
5. git checkout -b test svn/test
