var lfm = function (options, cb) {

  var route_prefix = (options && options.prefix) ? options.prefix : '/mari-filemanager';

  window.open(route_prefix + '?type=' + options.type || 'file', 'FileManager', 'width=900,height=600');
  window.SetUrl = cb;
};

Laraberg.registerCategory('Featherwebs', 'fw');

(function (blocks, editor, components, element) {
  var el = element.createElement;
  const {RichText, PlainText} = editor;
  const {registerBlockType} = blocks;
  const {Button} = components;

  registerBlockType('fw/text-image-right', {
    title: 'Text With Image to the right',
    description: 'A custom block for displaying image with text section on the right side',
    icon: 'align-right',
    category: 'fw',
    attributes: {
      title: {
        source: 'text',
        selector: '.fw-title--heading'
      },
      sub_title: {
        source: 'text',
        selector: '.fw-text--sub-heading'
      },
      body: {
        type: 'array',
        source: 'children',
        selector: '.fw-text--large'
      },
      imageUrl: {
        attribute: 'src',
        selector: '.fw-image-contain'
      }
    },
    edit({attributes, className, setAttributes}) {

      const getImageButton = () => {
        if (attributes.imageUrl) {
          return (
            <figure>
              <img
                src={attributes.imageUrl}
                onClick={handleImage}
                className="fw-image-contain"
              />
            </figure>
          );
        } else {
          return (
            <div className="button-container">
              <Button
                onClick={handleImage}
                className="button button-large"
              >
                Pick an image
              </Button>
            </div>
          );
        }
      };

      const handleImage = () => {
        lfm({type: 'image', prefix: '/mari-filemanager'}, function (url, path) {
          setAttributes({imageUrl: url});
        });
      };

      return (
        <div className="row">
          <div className="col-sm-8">
            <RichText
              onChange={content => setAttributes({title: content})}
              value={attributes.title}
              placeholder="Your card Title"
              formattingControls={['bold', 'italic', 'underline']}
              isSelected={attributes.isSelected}
              className="h1 mt-2"
            />
            <RichText
              onChange={content => setAttributes({sub_title: content})}
              value={attributes.sub_title}
              placeholder="Your card Sub Title"
              formattingControls={['bold', 'italic', 'underline']}
              isSelected={attributes.isSelected}
              className="h2"
            />
            <RichText
              onChange={content => setAttributes({body: content})}
              value={attributes.body}
              multiline="p"
              placeholder="Your card text"
              formattingControls={['bold', 'italic', 'underline']}
              isSelected={attributes.isSelected}
            />
          </div>
          <div className="col-sm-4">
            {getImageButton()}
          </div>
        </div>
      );

    },

    save({attributes}) {

      const cardImage = (src) => {
        if (!src) return null;

        // No alt set, so let's hide it from screen readers
        return (
          <img
            src={src}
            aria-hidden="true"
            className="fw-image-contain"
          />
        );
      };

      return (
        <section className="fw-box--white">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 d-flex align-items-center">
                <div>
                  <h2 className="fw-title--heading mb-0">{attributes.title}</h2>
                  <h4 className="fw-text--sub-heading mb-4">{attributes.sub_title}</h4>

                  <div className="fw-text--large">
                    {attributes.body}
                  </div>
                </div>
              </div>

              <div className="col-lg-3 offset-lg-1 px-4">
                {cardImage(attributes.imageUrl)}
              </div>
            </div>
          </div>
        </section>
      );
    }
  });

  registerBlockType('fw/text-image-left', {
    title: 'Text With Image to the left',
    description: 'A custom block for displaying image with text section on the left side',
    icon: 'align-left',
    category: 'fw',
    attributes: {
      title: {
        source: 'text',
        selector: '.fw-title--heading'
      },
      sub_title: {
        source: 'text',
        selector: '.fw-text--sub-heading'
      },
      body: {
        type: 'array',
        source: 'children',
        selector: '.fw-text--large'
      },
      imageUrl: {
        attribute: 'src',
        selector: '.fw-image-contain'
      }
    },
    edit({attributes, className, setAttributes}) {

      const getImageButton = () => {
        if (attributes.imageUrl) {
          return (
            <figure>
              <img
                src={attributes.imageUrl}
                onClick={handleImage}
                className="fw-image-contain"
              />
            </figure>
          );
        } else {
          return (
            <div className="button-container">
              <Button
                onClick={handleImage}
                className="button button-large"
              >
                Pick an image
              </Button>
            </div>
          );
        }
      };

      const handleImage = () => {
        lfm({type: 'image', prefix: '/mari-filemanager'}, function (url, path) {
          setAttributes({imageUrl: url});
        });
      };

      return (
        <div className="row">
          <div className="col-sm-4">
            {getImageButton()}
          </div>
          <div className="col-sm-8">
            <RichText
              onChange={content => setAttributes({title: content})}
              value={attributes.title}
              placeholder="Your card Title"
              formattingControls={['bold', 'italic', 'underline']}
              isSelected={attributes.isSelected}
              className="h1 mt-2"
            />
            <RichText
              onChange={content => setAttributes({sub_title: content})}
              value={attributes.sub_title}
              placeholder="Your card Sub Title"
              formattingControls={['bold', 'italic', 'underline']}
              isSelected={attributes.isSelected}
              className="h2"
            />
            <RichText
              onChange={content => setAttributes({body: content})}
              value={attributes.body}
              multiline="p"
              placeholder="Your card text"
              formattingControls={['bold', 'italic', 'underline']}
              isSelected={attributes.isSelected}
            />
          </div>
        </div>
      );

    },

    save({attributes}) {

      const cardImage = (src) => {
        if (!src) return null;

        // No alt set, so let's hide it from screen readers
        return (
          <img
            src={src}
            aria-hidden="true"
            className="fw-image-contain"
          />
        );
      };

      return (
        <section className="fw-box--white">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 offset-lg-1 px-4">
                {cardImage(attributes.imageUrl)}
              </div>
              <div className="col-lg-8 d-flex align-items-center">
                <div>
                  <h2 className="fw-title--heading mb-0">{attributes.title}</h2>
                  <h4 className="fw-text--sub-heading mb-4">{attributes.sub_title}</h4>

                  <div className="fw-text--large">
                    {attributes.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  });

  registerBlockType('fw/image-image', {
    title: 'Block with two Images in a row',
    description: 'A custom block for displaying two images in a row',
    icon: 'image-flip-horizontal',
    category: 'fw',
    attributes: {
      imageLeftUrl: {
        attribute: 'src',
        selector: '.fw-image1'
      },
      imageRightUrl: {
        attribute: 'src',
        selector: '.fw-image2'
      }
    },
    edit({attributes, className, setAttributes}) {

      const getImageButton = (property) => {
        if (attributes[property]) {
          return (
            <figure>
              <img
                src={attributes[property]}
                onClick={() => handleImage(property)}
                className="fw-image-contain"
              />
            </figure>
          );
        } else {
          return (
            <div className="button-container">
              <Button
                onClick={() => handleImage(property)}
                className="button button-large"
              >
                Pick an image
              </Button>
            </div>
          );
        }
      };

      const handleImage = (property) => {
        lfm({type: 'image', prefix: '/mari-filemanager'}, function (url, path) {
          setAttributes({[property]: url});
        });
      };

      return (
        <div className="row">
          <div className="col-sm-6">
            {getImageButton('imageLeftUrl')}
          </div>
          <div className="col-sm-6">
            {getImageButton('imageRightUrl')}
          </div>
        </div>
      );

    },

    save({attributes}) {

      const cardImage = (src, className) => {
        if (!src) return null;

        // No alt set, so let's hide it from screen readers
        return (
          <img
            src={src}
            aria-hidden="true"
            className={"fw-image-container__item " + className}
          />
        );
      };

      return (
        <section className="fw-section--small">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 pr-lg-4">
                <div className="fw-image-container--1-1">
                  {cardImage(attributes.imageLeftUrl, 'fw-image1')}
                </div>
              </div>
              <div className="col-lg-6 pr-lg-4">
                <div className="fw-image-container--1-1">
                  {cardImage(attributes.imageRightUrl, 'fw-image2')}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  })
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.element
);