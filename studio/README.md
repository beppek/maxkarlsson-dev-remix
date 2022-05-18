# Sanity Starter Studio

Congratulations 🍾 you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

This starter aims to put you a few steps ahead of starting with a blank studio. You may not need all the bits and pieces of this project, if so don't forget to remove them before you present this to the client or else they will wonder why those pieces don't work.

Have a look at the following links to learn more about the Studio and Sanity:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## What this starter gives you

You get a basic studio configuration to build flexible sites. It comes set up with the following top level documents:

### Navigation

This is where you can create menus. There's no limit to how deep you can nest links, so beware and make sure you inform the client of how deep your frontend supports link nesting in each menu.

The purpose of splitting out navigation to its own document is to allow temporary menus in case of special events like sales or product launches. Rather than changing a menu back and forth, you can create a new menu and point to that in the Global Site Layout (described below), then switch back to the old menu once the event is over.

### Page

Pages are highly flexible and made up of supported [documentation needed] modules [needs refinement]. The idea with Pages is that any page you create should be independent and won't be used on the frontend unless pointed to in a Page Route (see more below). The idea is similar to Navigation as this allows for temporary new pages rather than editing the same one back and forth.

### Blog

The Blog entry in the left hand menu is a top-level placeholder for all documents related to blogging. This includes Category, Author and Post.

### Page Routes

Page Routes is a clever way of adding flexibility to your builds. You'll find a few static routes, such as Home, Account and error pages (404 and 500). For any other pages you can either add them as static routes like the other ones (see [deskStructure.ts](https://github.com/beppek/sanity-starter/blob/master/deskStructure.ts)) or add them as Dynamic Routes. Dynamic routes is a different document type which allow you to set the URL path manually.

### Settings

This is where you'd set metadata such as Open Graph data.

### Global Site Layout

This is where you build the header and footer of the site. There is currently support for a primary and a secondary navigation menu in the header along with a header icon.

The footer is at this stage just a copy of the header and needs more work.

## Customize

The best thing about Santiy is that it's incredibly customizable. All icons in this starter can be replaced. The studio comes with React icons pre-installed. Have a look over at this site for available icons: https://react-icons.github.io/

You can also create your own icons if you prefer, they should just be created as regular React components and imported like the icons in this studio.

## Contribute

I want this to become as useful as possible to start up new sites with, regardless of what frontend framework will use the Sanity data in the end. That means it needs to get battle tested against as many use cases as possible. If you use this starter and find some areas lacking, please open a PR along with a description and we can improve this starter together.

## Vision

To start with this starter will remain private as it's not ready for prime time yet. Once it's a bit more battle tested I want to move it to an Open Source organisation and make it public. 
